import { DEMO_MODE, DEMO_REGISTER_MESSAGE, demoCredentialsMatch, endDemoSession, startDemoSession } from './demo';

/** `fields` mapeia um campo do formulário à mensagem quando o servidor recusa campos específicos. */
export type ApiResult =
  | { ok: true }
  | { ok: false; error: string; message: string; fields?: Record<string, string> };

export type RegisterData = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  crm: string;
  uf: string;
  especialidade: string;
  declaracao: boolean;
  /** Honeypot: sempre vazio para pessoas. */
  site?: string;
};

export type LoginData = { email: string; senha: string };

const GENERIC_ERROR = 'Não foi possível concluir agora. Tente novamente em instantes.';

async function post(path: string, body: object): Promise<ApiResult> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true };
    // `npm run dev` faz proxy de /api pro Docker; um 502 ali significa que os containers estão parados.
    if (import.meta.env.DEV && res.status === 502) {
      return { ok: false, error: 'dev', message: 'Servidor local desligado: rode "docker compose up -d" e tente de novo.' };
    }
    const data = await res.json().catch(() => null);
    return { ok: false, error: data?.error ?? 'servidor', message: data?.message ?? GENERIC_ERROR, fields: data?.fields };
  } catch {
    return { ok: false, error: 'rede', message: 'Sem conexão com o servidor. Verifique sua internet e tente novamente.' };
  }
}

// Build da Vercel (modo teste): sem backend — ver demo.ts.
async function demoLogin({ email, senha }: LoginData): Promise<ApiResult> {
  if (!(await demoCredentialsMatch(email, senha))) {
    return { ok: false, error: 'credenciais', message: 'E-mail ou senha incorretos.' };
  }
  startDemoSession();
  return { ok: true };
}

export const register = (data: RegisterData): Promise<ApiResult> =>
  DEMO_MODE
    ? Promise.resolve({ ok: false, error: 'fase_de_teste', message: DEMO_REGISTER_MESSAGE })
    : post('/api/register.php', data);
export const login = (data: LoginData) => (DEMO_MODE ? demoLogin(data) : post('/api/login.php', data));
export const logout = (): Promise<ApiResult> =>
  DEMO_MODE ? (endDemoSession(), Promise.resolve({ ok: true })) : post('/api/logout.php', {});
