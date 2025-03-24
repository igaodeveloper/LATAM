# Portfolio LATAM

## 📋 Sobre o Projeto
Este é um projeto de portfólio profissional desenvolvido com React, TypeScript e Vite. O projeto utiliza uma stack moderna de tecnologias e oferece uma experiência de usuário fluida e responsiva.

## 🚀 Tecnologias Utilizadas
- React 18
- TypeScript
- Vite
- TailwindCSS
- Radix UI
- Supabase
- React Router
- Framer Motion
- React Hook Form
- Zod
- Recharts
- E muito mais...

## 🛠️ Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação e Execução

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd portfolioigao-main/LATAM
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis necessárias no arquivo `.env`

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Para build de produção:
```bash
npm run build
# ou
yarn build
```

6. Para visualizar o build de produção:
```bash
npm run preview
# ou
yarn preview
```

## 📁 Estrutura do Projeto
```
src/
├── api/          # Configurações e chamadas de API
├── components/   # Componentes reutilizáveis
├── contexts/     # Contextos React
├── hooks/        # Custom hooks
├── lib/          # Utilitários e configurações
├── routes/       # Configuração de rotas
├── services/     # Serviços e integrações
├── styles/       # Estilos globais
├── types/        # Definições de tipos TypeScript
└── stories/      # Componentes de documentação
```

## 🎨 Features
- Design responsivo
- Animações suaves com Framer Motion
- Componentes acessíveis com Radix UI
- Formulários validados com Zod
- Estilização com TailwindCSS
- Navegação com React Router
- Integração com Supabase
- Visualização de dados com Recharts

## 📝 Scripts Disponíveis
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria o build de produção
- `npm run preview`: Visualiza o build de produção
- `npm run lint`: Executa o linter
- `npm run types:supabase`: Gera tipos do Supabase

## 🔒 Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 🤝 Contribuindo
1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores
- Igor Oliveira - Desenvolvedor Principal

## 🙏 Agradecimentos
- Todos os contribuidores que ajudaram no desenvolvimento deste projeto
- Comunidade React e todas as bibliotecas utilizadas

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Deploy

### Deploy no Vercel

1. Crie uma conta no [Vercel](https://vercel.com/) se ainda não tiver uma.
2. Conecte sua conta do Vercel ao GitHub, GitLab ou Bitbucket onde seu repositório está hospedado.
3. Importe o projeto no Vercel:
   - Clique em "Add New" → "Project"
   - Selecione o repositório
   - Configure as variáveis de ambiente necessárias:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_BASE_PATH` (geralmente `/`)
   - Clique em "Deploy"

### Deploy no Netlify

1. Crie uma conta no [Netlify](https://netlify.com/) se ainda não tiver uma.
2. Conecte sua conta do Netlify ao GitHub, GitLab ou Bitbucket onde seu repositório está hospedado.
3. Importe o projeto no Netlify:
   - Clique em "Add new site" → "Import an existing project"
   - Selecione o repositório
   - Configure as seguintes opções:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Configure as variáveis de ambiente necessárias:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_BASE_PATH` (geralmente `/`)
   - Clique em "Deploy site"

## Solução de problemas comuns

- **Problema de roteamento**: Se as rotas não estiverem funcionando após o deploy, verifique se os arquivos `vercel.json` (para Vercel) ou `netlify.toml` e `public/_redirects` (para Netlify) estão presentes e configurados corretamente.
- **Variáveis de ambiente**: Certifique-se de que todas as variáveis de ambiente necessárias estão configuradas corretamente na plataforma de deploy.
- **Erro de build**: Se houver erros durante o build, verifique os logs de build na plataforma de deploy para identificar e corrigir o problema.
