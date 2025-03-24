// vercel-build.js
const fs = require('fs');
const { execSync } = require('child_process');
const deployCheck = require('./deploy-check.cjs');

// Criar arquivo .env com as variáveis de ambiente
const envContent = `VITE_SUPABASE_URL=${process.env.VITE_SUPABASE_URL}
VITE_SUPABASE_ANON_KEY=${process.env.VITE_SUPABASE_ANON_KEY}
VITE_BASE_PATH=${process.env.VITE_BASE_PATH || '/'}
NODE_ENV=production
`;

fs.writeFileSync('.env', envContent);

try {
  // Verificar estrutura do projeto
  console.log('Verificando estrutura do projeto...');
  execSync('node deploy-check.cjs', { stdio: 'inherit' });
  
  // Executar o build
  console.log('Executando build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copiar index.html para 404.html para SPA routing
  console.log('Copiando index.html para 404.html...');
  fs.copyFileSync('dist/index.html', 'dist/404.html');
  
  console.log('Build finalizado com sucesso!');
} catch (error) {
  console.error('Erro durante o build:', error);
  process.exit(1);
} 