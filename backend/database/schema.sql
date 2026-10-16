-- Opella Hub — estrutura do banco (MariaDB 10.x / MySQL 5.7+).
-- Rodar uma vez no banco de produção antes do primeiro acesso.

CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL,
  -- password_hash() da senha (bcrypt); a senha em si nunca é gravada.
  senha_hash VARCHAR(255) NOT NULL,
  crm VARCHAR(8) NOT NULL,
  uf CHAR(2) NOT NULL,
  especialidade VARCHAR(120) NOT NULL,
  -- Sempre 'nao_verificado': não há consulta oficial de CRM. Mantido para o caso de uma
  -- validação ser feita depois, por fora.
  crm_status VARCHAR(20) NOT NULL DEFAULT 'nao_verificado',
  declaracao_aceita_em DATETIME NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email),
  UNIQUE KEY uq_usuarios_crm_uf (crm, uf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessoes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  -- NULL para quem entrou pelo link sem login (?acesso=CÓDIGO), sem cadastro.
  usuario_id INT UNSIGNED NULL,
  -- SHA-256 do token do cookie; o token em si nunca é gravado.
  token_hash CHAR(64) NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expira_em DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sessoes_token (token_hash),
  KEY idx_sessoes_expira (expira_em),
  CONSTRAINT fk_sessoes_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Logins com erro, para bloquear quem tenta adivinhar senhas. Linhas com mais de
-- um dia são apagadas automaticamente.
CREATE TABLE IF NOT EXISTS tentativas_login (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL,
  ip VARCHAR(45) NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_tentativas_email (email, criado_em),
  KEY idx_tentativas_ip (ip, criado_em),
  KEY idx_tentativas_criado (criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tentativas de cadastro por IP, para frear robôs criando contas em massa.
-- Linhas com mais de um dia são apagadas automaticamente.
CREATE TABLE IF NOT EXISTS tentativas_cadastro (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ip VARCHAR(45) NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_tentativas_cadastro_ip (ip, criado_em),
  KEY idx_tentativas_cadastro_criado (criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS acessos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  -- NULL para quem entrou pelo link sem login, sem cadastro.
  usuario_id INT UNSIGNED NULL,
  -- 'cadastro', 'login', 'banner' (entrada pelo link sem login) ou 'visita' (cada abertura de uma página com sessão).
  evento VARCHAR(20) NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_acessos_usuario (usuario_id),
  KEY idx_acessos_criado (criado_em),
  CONSTRAINT fk_acessos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
