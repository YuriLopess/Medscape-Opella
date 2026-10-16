import { cpSync, renameSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import type { Plugin, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { searchIndex } from './tools/searchIndex';
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

// Builds estáticos (sem backend PHP): `--mode demo` (Vercel: tela de login de teste que carrega o app
// sob demanda) e `--mode publico` (Medscape sem login, ver appWithoutGate).
const demoBuild = {
  outDir: OUT_DIR,
  emptyOutDir: true,
};

// Sem login (`vite build --mode publico`, servidor da Medscape enquanto o banco não é liberado):
// o index.html carrega o app direto, sem a tela de cadastro/login nem backend PHP.
function appWithoutGate(): Plugin {
  return {
    name: 'app-without-gate',
    // 'pre': precisa rodar antes do Vite ler o <script> do HTML, senão a entrada continua sendo o gate
    transformIndexHtml: { order: 'pre', handler: (html) => html.replace('/src/gate/main.tsx', '/src/main.tsx') },
  };
}

const APP_ENTRY = path('./src/main.tsx').replace(/\\/g, '/');
const isAppEntry = (id: string | null | undefined) => !!id && id.replace(/\\/g, '/') === APP_ENTRY;

// Build padrão (`npm run build`): servidor da Medscape com login (index.php + backend PHP + banco).
const withLogin: UserConfig = {
  plugins: [react(), searchIndex(), copyBackend()],
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
        // O código do app não fica na entrada "home" (só a página), e sim num chunk à parte com o nome do
        // arquivo (main): por isso a checagem é pelo módulo src/main.tsx dentro do chunk.
        entryFileNames: (chunk) => (chunk.name === 'home' ? 'private/[name]-[hash].js' : 'assets/[name]-[hash].js'),
        chunkFileNames: (chunk) =>
          chunk.isDynamicEntry || chunk.moduleIds.some(isAppEntry) ? 'private/[name]-[hash].js' : 'assets/[name]-[hash].js',
        assetFileNames: (asset) => {
          const name = asset.names?.[0] ?? '';
          return name === 'main.css' || name === 'home.css' ? 'private/[name]-[hash][extname]' : 'assets/[name]-[hash][extname]';
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
};

export default defineConfig(({ mode }): UserConfig => {
  if (mode === 'publico') return { plugins: [react(), searchIndex(), appWithoutGate()], build: demoBuild };
  if (mode === 'demo') return { plugins: [react(), searchIndex()], build: demoBuild };
  return withLogin;
});
