// deploy-check.cjs
const fs = require('fs');
const path = require('path');

// Arquivos essenciais que devem existir
const requiredFiles = [
  'index.html',
  'package.json',
  'vite.config.ts',
  'netlify.toml',
  'vercel.json',
  'public/_redirects',
  'src/main.tsx',
  'src/App.tsx',
  'src/routes.tsx'
];

// Verificar se todos os arquivos essenciais existem
console.log('Verificando arquivos essenciais...');
let missingFiles = false;

requiredFiles.forEach(file => {
  try {
    if (!fs.existsSync(file)) {
      console.error(`Arquivo essencial não encontrado: ${file}`);
      missingFiles = true;
    } else {
      console.log(`✓ ${file}`);
    }
  } catch (error) {
    console.error(`Erro ao verificar o arquivo ${file}:`, error);
    missingFiles = true;
  }
});

// Verificar configuração de ambiente
console.log('\nVerificando configuração de ambiente...');
try {
  if (!fs.existsSync('.env')) {
    console.warn('Arquivo .env não encontrado. Certifique-se de que as variáveis de ambiente estão configuradas na plataforma de deploy.');
  } else {
    console.log('✓ .env file found');
    
    // Verificar variáveis de ambiente essenciais
    const envContent = fs.readFileSync('.env', 'utf-8');
    const essentialVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY', 'VITE_BASE_PATH'];
    
    essentialVars.forEach(varName => {
      if (!envContent.includes(varName)) {
        console.warn(`Variável de ambiente ${varName} não encontrada no arquivo .env`);
      } else {
        console.log(`✓ ${varName}`);
      }
    });
  }
} catch (error) {
  console.error('Erro ao verificar o arquivo .env:', error);
}

// Verificar scripts de build
console.log('\nVerificando scripts de build...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  const requiredScripts = ['build', 'postbuild', 'vercel-build', 'netlify-build'];
  requiredScripts.forEach(script => {
    if (!packageJson.scripts[script]) {
      console.warn(`Script ${script} não encontrado no package.json`);
    } else {
      console.log(`✓ ${script}`);
    }
  });
} catch (error) {
  console.error('Erro ao verificar os scripts de build:', error);
  missingFiles = true;
}

if (missingFiles) {
  console.error('\nErro: Arquivos essenciais estão faltando. O deploy pode falhar.');
  process.exit(1);
} else {
  console.log('\nTudo parece estar em ordem para o deploy! 🚀');
}

module.exports = {}; 