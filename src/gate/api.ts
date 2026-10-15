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

export const register = (data: RegisterData) => post('/api/register.php', data);
export const login = (data: LoginData) => post('/api/login.php', data);
export const logout = () => post('/api/logout.php', {});
