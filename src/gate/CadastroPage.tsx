import { Fragment, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import './CadastroPage.css';
import Select from './Select';
import { brazilianStates } from './data/brazilianStates';
import { medicalSpecialties } from './data/medicalSpecialties';
import { commonPasswords } from './data/commonPasswords';
import { login, register } from './api';
import { img } from '../lib/assets';

const stateOptions = brazilianStates.map((s) => ({ value: s.uf, label: s.name }));

/** O que o cadastro libera: as quatro áreas da home, com as faixas de marca do site (tools/extract_gate_assets.py). */
const areas = [
  { brand: 'Allegra', area: 'Alergia', image: 'gate/marca-allegra.webp' },
  { brand: 'Enterogermina', area: 'Saúde Digestiva', image: 'gate/marca-enterogermina.webp' },
  { brand: 'Os-Cal', area: 'Saúde Óssea da Mulher', image: 'gate/marca-oscal.webp' },
  { brand: 'Novalgina', area: 'Dor e Febre', image: 'gate/marca-novalgina.webp' },
];
const specialtyOptions = medicalSpecialties.map((s) => ({ value: s, label: s }));

type CadastroPageProps = {
  /** Chamado assim que o servidor abre uma sessão e a animação de saída termina. */
  onEnter: () => void;
};

/** 'cadastro' é o cadastro completo; 'entrar' é para quem já tem cadastro. */
type Mode = 'cadastro' | 'entrar';

type ServerError = { error: string; message: string };

type FormState = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  crm: string;
  uf: string;
  especialidade: string;
  declaracao: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CRM_PATTERN = /^\d{4,8}$/;
const MIN_PASSWORD = 8;
// Mesmos limites do servidor (register.php) e das colunas do banco.
const NAME_MAX = 100;
const EMAIL_MAX = 190;
const PASSWORD_MAX = 200;

/** Letras (com acentos), espaço, hífen, apóstrofo ou ponto; pelo menos 2 letras. Espelha valid_name(). */
function validateName(value: string, label: 'nome' | 'sobrenome'): string | undefined {
  const v = value.trim();
  if (!v) return `Informe o ${label}.`;
  const lettersOnly = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u.test(v);
  if (!lettersOnly || (v.match(/\p{L}/gu) ?? []).length < 2) return `Use apenas letras no ${label} (mínimo de 2).`;
  return undefined;
}

/**
 * Está na lista de senhas comuns, ou contém a parte do e-mail antes do @ (4+ caracteres).
 * Espelha password_too_obvious() em backend/web/server/bootstrap.php.
 */
function passwordTooObvious(senha: string, email: string): boolean {
  const lower = senha.toLowerCase();
  if (commonPasswords.includes(lower)) return true;
  const local = email.trim().toLowerCase().split('@')[0] ?? '';
  return local.length >= 4 && lower.includes(local);
}

/** 8+ caracteres com uma letra e um dígito, e não óbvia demais. Espelha valid_password(). */
function validatePassword(senha: string, email: string): string | undefined {
  if (senha.length < MIN_PASSWORD || !/\p{L}/u.test(senha) || !/\d/.test(senha)) {
    return `A senha deve ter de ${MIN_PASSWORD} a ${PASSWORD_MAX} caracteres, com letras e números.`;
  }
  if (passwordTooObvious(senha, email)) return 'Essa senha é fácil de adivinhar. Escolha outra.';
  return undefined;
}

/**
 * Não há consulta oficial de CRM, então isso só pega números digitados pra passar pelo campo:
 * tudo zero, um dígito repetido ou sequência (123456 / 987654). Espelha crm_looks_made_up()
 * em backend/web/server/bootstrap.php.
 */
function crmLooksMadeUp(crm: string): boolean {
  if (/^0+$/.test(crm) || /^(\d)\1+$/.test(crm)) return true;
  const steps = [...crm].slice(1).map((d, i) => Number(d) - Number(crm[i]));
  return steps.every((s) => s === 1) || steps.every((s) => s === -1);
}

const initialForm: FormState = {
  nome: '',
  sobrenome: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  crm: '',
  uf: '',
  especialidade: '',
  declaracao: false,
};

export default function CadastroPage({ onEnter }: CadastroPageProps) {
  const [mode, setMode] = useState<Mode>('cadastro');
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Honeypot: escondido de pessoas, só bots preenchem; o servidor recusa esses cadastros.
  const honeypotRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
    setServerError(null);
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.email.trim()) next.email = 'Informe o e-mail.';
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Informe um e-mail válido.';
    if (mode === 'entrar') {
      if (!form.senha) next.senha = 'Informe a senha.';
      return next;
    }

    next.senha = validatePassword(form.senha, form.email);
    if (!form.confirmarSenha) next.confirmarSenha = 'Confirme a senha.';
    else if (form.confirmarSenha !== form.senha) next.confirmarSenha = 'As senhas não conferem.';
    if (!CRM_PATTERN.test(form.crm)) next.crm = 'O CRM deve ter entre 4 e 8 dígitos.';
    else if (crmLooksMadeUp(form.crm)) next.crm = 'Confira o número do CRM.';
    next.nome = validateName(form.nome, 'nome');
    next.sobrenome = validateName(form.sobrenome, 'sobrenome');
    if (!form.uf) next.uf = 'Selecione o estado (UF).';
    if (!form.especialidade) next.especialidade = 'Selecione a especialidade.';
    if (!form.declaracao) next.declaracao = 'É necessário confirmar a declaração para continuar.';
    // Descarta as entradas que os validadores deixaram undefined, pra "sem chaves" seguir significando "válido".
    return Object.fromEntries(Object.entries(next).filter(([, msg]) => msg)) as FormErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    setServerError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const email = form.email.trim();
    const result =
      mode === 'entrar'
        ? await login({ email, senha: form.senha })
        : await register({
            nome: form.nome,
            sobrenome: form.sobrenome,
            email,
            senha: form.senha,
            crm: form.crm,
            uf: form.uf,
            especialidade: form.especialidade,
            declaracao: form.declaracao,
            site: honeypotRef.current?.value ?? '',
          });
    if (result.ok) {
      setLeaving(true);
    } else {
      // O servidor nomeia os campos que recusou; mostra cada mensagem embaixo do campo.
      if (result.fields) setErrors(result.fields as FormErrors);
      setServerError(result);
      setSubmitting(false);
    }
  };

  const fieldEmail = (
    <div className={`cadastro-field${errors.email ? ' has-error' : ''}`}>
      <label htmlFor="cad-email">E-mail<span className="req">*</span></label>
      <input
        id="cad-email"
        type="email"
        autoComplete="email"
        maxLength={EMAIL_MAX}
        placeholder="nome@instituicao.com.br"
        value={form.email}
        onChange={(e) => setField('email', e.target.value)}
      />
      {errors.email && <span className="cadastro-field-msg">{errors.email}</span>}
    </div>
  );

  const fieldCrm = (
    <div className={`cadastro-field${errors.crm ? ' has-error' : ''}`}>
      <label htmlFor="cad-crm">CRM<span className="req">*</span></label>
      <input
        id="cad-crm"
        type="text"
        inputMode="numeric"
        placeholder="123456"
        value={form.crm}
        onChange={(e) => setField('crm', e.target.value.replace(/\D/g, '').slice(0, 8))}
      />
      {errors.crm && <span className="cadastro-field-msg">{errors.crm}</span>}
    </div>
  );

  const passwordField = (
    id: string,
    field: 'senha' | 'confirmarSenha',
    label: string,
    autoComplete: 'new-password' | 'current-password',
  ) => (
    <div className={`cadastro-field${errors[field] ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}<span className="req">*</span></label>
      <div className="cadastro-password">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          maxLength={PASSWORD_MAX}
          placeholder={autoComplete === 'new-password' ? 'Mín. 8, letras e números' : 'Sua senha'}
          value={form[field]}
          onChange={(e) => setField(field, e.target.value)}
        />
        {/* Um único botão compartilhado pelos dois campos de senha, pra mostrarem/esconderem juntos. */}
        <button
          type="button"
          className="cadastro-password-toggle"
          aria-controls={id}
          aria-pressed={showPassword}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          onClick={() => setShowPassword((s) => !s)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
            {showPassword && <path d="M4 4l16 16" />}
          </svg>
        </button>
      </div>
      {errors[field] && <span className="cadastro-field-msg">{errors[field]}</span>}
    </div>
  );

  return (
    <div
      className={`cadastro-screen${leaving ? ' is-leaving' : ''}`}
      onAnimationEnd={(e) => {
        if (leaving && e.target === e.currentTarget) onEnter();
      }}
    >
      <div className="cadastro-shell">
        <aside className="cadastro-hero">
          <div className="cadastro-hero-inner">
            <img className="cadastro-wordmark" src={img('brand/opella-logo.svg')} alt="Opella" />
            <p className="cadastro-hero-title">Hub científico para profissionais de saúde</p>

            <p className="cadastro-areas-label" id="cad-areas">Com o cadastro, você acessa</p>
            <ul className="cadastro-areas" aria-labelledby="cad-areas">
              {areas.map((a) => (
                <li key={a.brand}>
                  <img src={img(a.image)} alt={a.brand} width={140} height={51} />
                  <span>{a.area}</span>
                </li>
              ))}
            </ul>
            {/* celular: os logos ficam numa linha e as áreas viram esta legenda, na mesma ordem */}
            <p className="cadastro-areas-caption">
              {areas.map((a, i) => (
                <Fragment key={a.brand}>
                  {i > 0 && ' · '}
                  <span>{a.area}</span>
                </Fragment>
              ))}
            </p>
            <p className="cadastro-hero-note">
              Artigos científicos e documentos da Sociedade Brasileira de Pediatria, atualizados para a prática
              clínica.
            </p>
          </div>
        </aside>

        <div className="cadastro-form-pane">
          <div className="cadastro-tabs" role="group" aria-label="Tipo de acesso">
            <button type="button" aria-pressed={mode === 'cadastro'} onClick={() => mode !== 'cadastro' && switchMode('cadastro')}>
              Criar cadastro
            </button>
            <button type="button" aria-pressed={mode === 'entrar'} onClick={() => mode !== 'entrar' && switchMode('entrar')}>
              Entrar
            </button>
          </div>

          <h1 className="cadastro-title">{mode === 'entrar' ? 'Entre na sua conta' : 'Crie seu cadastro'}</h1>
          <p className="cadastro-subtitle">
            {mode === 'entrar'
              ? 'Use o e-mail e a senha do seu cadastro.'
              : 'Informe seus dados e seu registro profissional. O conteúdo é liberado assim que o cadastro é concluído.'}
          </p>

          <form className="cadastro-form" onSubmit={handleSubmit} noValidate>
            <div className="cadastro-hp" aria-hidden="true">
              <label htmlFor="cad-site">Deixe este campo em branco</label>
              <input ref={honeypotRef} id="cad-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            {mode === 'entrar' ? (
              <div className="cadastro-group" key="entrar">
                {fieldEmail}
                {passwordField('cad-senha', 'senha', 'Senha', 'current-password')}
              </div>
            ) : (
              <>
                <div className="cadastro-group">
                  <h2 className="cadastro-group-tag">Identificação</h2>

                  <div className="cadastro-grid-2">
                    <div className={`cadastro-field${errors.nome ? ' has-error' : ''}`}>
                      <label htmlFor="cad-nome">Nome<span className="req">*</span></label>
                      <input
                        id="cad-nome"
                        type="text"
                        autoComplete="given-name"
                        maxLength={NAME_MAX}
                        placeholder="Seu nome"
                        value={form.nome}
                        onChange={(e) => setField('nome', e.target.value)}
                      />
                      {errors.nome && <span className="cadastro-field-msg">{errors.nome}</span>}
                    </div>

                    <div className={`cadastro-field${errors.sobrenome ? ' has-error' : ''}`}>
                      <label htmlFor="cad-sobrenome">Sobrenome<span className="req">*</span></label>
                      <input
                        id="cad-sobrenome"
                        type="text"
                        autoComplete="family-name"
                        maxLength={NAME_MAX}
                        placeholder="Seu sobrenome"
                        value={form.sobrenome}
                        onChange={(e) => setField('sobrenome', e.target.value)}
                      />
                      {errors.sobrenome && <span className="cadastro-field-msg">{errors.sobrenome}</span>}
                    </div>
                  </div>

                  {fieldEmail}

                  <div className="cadastro-grid-2 cadastro-grid-2--wide">
                    {passwordField('cad-senha', 'senha', 'Senha', 'new-password')}
                    {passwordField('cad-confirmar-senha', 'confirmarSenha', 'Confirmar senha', 'new-password')}
                  </div>
                </div>

                <div className="cadastro-group">
                  <h2 className="cadastro-group-tag">Registro profissional</h2>

                  <div className="cadastro-grid-2">
                    {fieldCrm}

                    <div className={`cadastro-field${errors.uf ? ' has-error' : ''}`}>
                      <label htmlFor="cad-uf">Estado (UF)<span className="req">*</span></label>
                      <Select
                        id="cad-uf"
                        value={form.uf}
                        onChange={(v) => setField('uf', v)}
                        options={stateOptions}
                        placeholder="Selecione"
                        hasError={!!errors.uf}
                      />
                      {errors.uf && <span className="cadastro-field-msg">{errors.uf}</span>}
                    </div>
                  </div>

                  <div className={`cadastro-field${errors.especialidade ? ' has-error' : ''}`}>
                    <label htmlFor="cad-especialidade">Especialidade<span className="req">*</span></label>
                    <Select
                      id="cad-especialidade"
                      value={form.especialidade}
                      onChange={(v) => setField('especialidade', v)}
                      options={specialtyOptions}
                      placeholder="Selecione"
                      hasError={!!errors.especialidade}
                    />
                    {errors.especialidade && <span className="cadastro-field-msg">{errors.especialidade}</span>}
                  </div>
                </div>

                <div className="cadastro-group">
                  <label className={`cadastro-checkbox-field${errors.declaracao ? ' has-error' : ''}`}>
                    <input
                      id="cad-declaracao"
                      type="checkbox"
                      checked={form.declaracao}
                      onChange={(e) => setField('declaracao', e.target.checked)}
                    />
                    <span>
                      Declaro ser um profissional da saúde devidamente registrado e responsável pela veracidade das
                      informações fornecidas.
                    </span>
                  </label>
                  {errors.declaracao && <span className="cadastro-field-msg">{errors.declaracao}</span>}
                </div>
              </>
            )}

            {serverError && (
              <div className="cadastro-alert" role="alert">
                <p>{serverError.message}</p>
                {serverError.error === 'ja_cadastrado' && (
                  <button type="button" className="cadastro-link" onClick={() => switchMode('entrar')}>
                    Entrar com meu cadastro
                  </button>
                )}
              </div>
            )}

            <button type="submit" className="cadastro-submit" disabled={submitting}>
              {submitting ? 'Aguarde…' : mode === 'entrar' ? 'Entrar' : 'Criar cadastro e acessar'}
            </button>
          </form>

        </div>
      </div>

      <div className="cadastro-footer">
        <p>
          Desenvolvido pela Medscape com o apoio da Opella. As opiniões e os pontos de vista expressos não
          representam necessariamente a visão da Medscape, de seus editores, consultores ou anunciantes.
        </p>
      </div>
    </div>
  );
}
