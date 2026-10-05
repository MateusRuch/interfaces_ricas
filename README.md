# Biblioteca pessoal

Aplicação Angular para cadastrar, listar, detalhar, editar e remover livros. Os registros ficam em memória durante o uso.

## Tecnologias

- Angular 22
- Optimus UI 2 (`@openng/optimus-ui`) com tema Aura
- Tailwind CSS 4 e integração `@openng/optimus-ui-tailwindcss`

## Executar

```bash
npm install
npm start
```

Abra `http://localhost:4200/`. Para gerar a versão de produção:

```bash
npm run build
```

## Arquivos principais

- `package.json` e `package-lock.json`: dependências e versões instaladas.
- `angular.json`: configuração do build Angular.
- `.postcssrc.json` e `src/styles.css`: configuração e importações do Tailwind CSS.
- `src/app/app.config.ts`: tema Aura e configuração global do Optimus UI.
- `src/app/app.ts`: modelo `Book`, dados em memória e operações da biblioteca.
- `src/app/app.html`: tela, data binding, eventos e componentes Optimus UI ajustados com Tailwind.

O modelo contém título e autor (`string`), páginas e avaliação (`number`), data de publicação (`date`, armazenada como string ISO) e situação de leitura (`boolean`).
