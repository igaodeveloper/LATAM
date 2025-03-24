#!/bin/bash

# Instalar dependências
npm install

# Criar arquivo .env a partir das variáveis de ambiente
echo "VITE_SUPABASE_URL=$VITE_SUPABASE_URL" > .env
echo "VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY" >> .env
echo "VITE_BASE_PATH=$VITE_BASE_PATH" >> .env
echo "NODE_ENV=production" >> .env

# Verificar estrutura do projeto
echo "Verificando estrutura do projeto..."
node deploy-check.cjs
if [ $? -ne 0 ]; then
  echo "Erro na verificação da estrutura do projeto. Abortando build."
  exit 1
fi

# Executar build
echo "Executando build..."
npm run build
if [ $? -ne 0 ]; then
  echo "Erro durante o build. Abortando."
  exit 1
fi

# Copiar index.html para 404.html para SPA routing
echo "Copiando index.html para 404.html..."
cp dist/index.html dist/404.html

echo "Build finalizado com sucesso!" 