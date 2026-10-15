import { cpSync, renameSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { medicalSpecialties } from './src/gate/data/medicalSpecialties';
import { commonPasswords } from './src/gate/data/commonPasswords';

const path = (p: string) => fileURLToPath(new URL(p, import.meta.url));
const OUT_DIR = path('./dist');

// Copia o backend PHP pra junto das páginas geradas, pra dist/ ser exatamente o que vai pro servidor.
function copyBackend(): Plugin {
  return {
    name: 'copy-backend',
    apply: 'build',
    closeBundle() {
      // As páginas referenciam /private/*, que private.php serve de private-files/ após checar a sessão.
      renameSync(`${OUT_DIR}/private`, `${OUT_DIR}/private-files`);
      cpSync(path('./backend/web'), OUT_DIR, {
        recursive: true,
        // Credenciais de produção vivem só no servidor e nunca podem ser sobrescritas por um deploy.
        filter: (src) => !src.endsWith('config.local.php'),
      });
      // O servidor valida contra as mesmas listas que a tela usa.
      writeFileSync(`${OUT_DIR}/server/especialidades.json`, JSON.stringify(medicalSpecialties));
      writeFileSync(`${OUT_DIR}/server/senhas-comuns.json`, JSON.stringify(commonPasswords));
    },
  };
}

// Modo teste (`vite build --mode demo`, usado pela Vercel): site estático, sem backend PHP. Uma única
// página (index.html = tela de login) que carrega o app sob demanda depois do login de teste.
const demoBuild = {
  outDir: OUT_DIR,
  emptyOutDir: true,
};

export default defineConfig(({ mode }) => (mode === 'demo' ? { plugins: [react()], build: demoBuild } : {
  plugins: [react(), copyBackend()],
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
    rollupOptions: {
      // index.html é a tela pública de cadastro/login; home.html só é entregue pelo index.php
      // depois do login; 404.html é a página de erro (ErrorDocument do Apache).
      input: {
        index: path('./index.html'),
        home: path('./home.html'),
        notFound: path('./404.html'),
      },
      output: {
        // Código só do app vai pra private/, que o servidor só entrega com sessão válida.
        // O gate (entrada "index") não faz nenhum import() dinâmico, então todo chunk
        // dinâmico do build (artigos e documentos, carregados sob demanda) é exclusivo do
        // app — por isso isDynamicEntry também vai pra private/, não só a entrada "home".
        entryFileNames: (chunk) => (chunk.name === 'home' ? 'private/[name]-[hash].js' : 'assets/[name]-[hash].js'),
        chunkFileNames: (chunk) => (chunk.isDynamicEntry ? 'private/[name]-[hash].js' : 'assets/[name]-[hash].js'),
        assetFileNames: (asset) => {
          const name = asset.names?.[0] ?? '';
          return name === 'home.css' ? 'private/[name]-[hash][extname]' : 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    // `npm run dev` fala com a API PHP rodando no Docker (docker compose up). O proxy reescreve
    // o Host pra localhost:8081 mas manteria o Origin como localhost:5173, que a checagem de
    // mesma origem da API (read_json_post) recusa — então o Origin é removido aqui. Só em dev;
    // produção não tem proxy.
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        configure: (proxy) => proxy.on('proxyReq', (req) => req.removeHeader('origin')),
      },
    },
  },
}));
