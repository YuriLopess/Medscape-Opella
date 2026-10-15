/**
 * Modo de teste (build da Vercel, `npm run build:vercel`): sem backend, o login é checado no
 * navegador contra um único usuário de teste e o cadastro avisa que está em fase de testes.
 *
 * ATENÇÃO: isto é só uma porta de demonstração. Como roda no navegador, não protege o conteúdo de
 * verdade (o código do app vai junto no build). O login real, com banco e sessão no servidor, é o
 * do servidor da Medscape (backend/ e `npm run build`).
 */

/** Ligado só no build da Vercel (.env.demo). */
export const DEMO_MODE = import.meta.env.VITE_AUTH_MODE === 'demo';

/** Usuário de teste. A senha não fica no código: só o SHA-256 dela (com o sal abaixo). */
const TEST_USER = {
  email: 'teste@opellahub.com.br',
  salt: 'opellahub-teste-v1',
  passwordSha256: '5a875e4240871068051620f0340cbb35398a1bf6347962a079a01d000996cc03',
};

const SESSION_KEY = 'opella_teste_sessao';
const SESSION_DAYS = 30;

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function demoCredentialsMatch(email: string, senha: string): Promise<boolean> {
  if (email.trim().toLowerCase() !== TEST_USER.email) return false;
  return (await sha256(`${TEST_USER.salt}:${senha}`)) === TEST_USER.passwordSha256;
}

export function startDemoSession(): void {
  try {
    localStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_DAYS * 864e5));
  } catch {
    /* sem armazenamento (aba anônima restrita): a sessão dura só até recarregar */
  }
}

export function hasDemoSession(): boolean {
  try {
    const until = Number(localStorage.getItem(SESSION_KEY));
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false;
  }
}

export function endDemoSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* nada a limpar */
  }
}

export const DEMO_REGISTER_MESSAGE =
  'O cadastro ainda está em fase de testes. Para acessar o conteúdo agora, use o login de teste fornecido pela equipe.';
