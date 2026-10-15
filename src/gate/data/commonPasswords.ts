// Senhas que passam na regra "letras e números, 8+" mas são óbvias demais pra aceitar.
// Comparadas sem diferenciar maiúsculas/minúsculas. O build copia esta lista pro servidor
// (server/senhas-comuns.json) pra formulário e register.php recusarem as mesmas.
export const commonPasswords: string[] = [
  '12345678a', 'a12345678', 'a1234567', 'abc12345', 'abcd1234', 'abc123456', 'abcde12345',
  'senha123', 'senha1234', 'senha12345', 'senha123456', 'minhasenha1', 'minhasenha123',
  'password1', 'password12', 'password123', 'passw0rd', 'qwerty123', 'qwerty12', 'qwe12345',
  '1q2w3e4r', '1q2w3e4r5t', 'q1w2e3r4', 'zaq12wsx', 'asdf1234', 'asd12345', 'iloveyou1',
  'admin123', 'admin1234', 'teste123', 'teste1234', 'mudar123', 'mudar1234', 'trocar123',
  'brasil123', 'brasil2024', 'brasil2025', 'brasil2026', 'medico123', 'medicina1', 'medicina123',
  'doutor123', 'opella123', 'opella2026', 'acesso123', 'cadastro1',
];
