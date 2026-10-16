-- Migração de 16/10/2026 (link sem login): bancos criados antes disso exigiam usuário em toda
-- sessão e acesso. Já aplicada em produção; o schema.sql atual já nasce assim.
ALTER TABLE sessoes MODIFY usuario_id INT UNSIGNED NULL;
ALTER TABLE acessos MODIFY usuario_id INT UNSIGNED NULL;
