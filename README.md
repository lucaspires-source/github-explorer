# GitHub Explorer

Aplicação client-side para buscar usuários do GitHub e explorar seus repositórios públicos, construída com **React 18**, **React Router** e **Bootstrap 5**.

## Funcionalidades

- Busca de qualquer usuário do GitHub pelo nome de usuário
- Visualização do perfil: avatar, bio, e-mail, localização, seguidores e seguidos
- Listagem de repositórios públicos ordenados por estrelas (decrescente) por padrão
- Alteração da ordenação por estrelas, forks, nome ou última atualização — com toggle asc/desc
- Página de detalhes de cada repositório: descrição, estatísticas, linguagem, licença, tópicos e link externo para o GitHub
- Estados de carregamento com skeleton e tratamento robusto de erros (Error Boundary + estados por rota)
- Buscas recentes sincronizadas via localStorage
- Cancelamento automático de requisições em rota obsoleta (`AbortController`)
- Layout totalmente responsivo (grid Bootstrap 5)

## Tecnologias

- **React 18** — hooks, `StrictMode`, `useReducer`, `memo`
- **React Router v6** — `HashRouter` (sem rewrite de servidor necessário)
- **Vite** — dev server e build
- **Axios** — cliente HTTP com suporte a `AbortSignal`
- **Bootstrap 5** + **Bootstrap Icons**

### Padrões e boas práticas adotadas

- Separação de camadas: `api/` (integração), `hooks/` (estado e efeitos), `components/` (UI), `pages/` (rotas), `utils/` (helpers puros)
- Estado de fetch (`idle | pending | success | error`) via `useReducer` em hook reutilizável (`useAsync`)
- `ErrorBoundary` global para erros inesperados de renderização
- Componentes puros, memoizados quando necessário (`RepoCard`)
- Derivação de dados ordenados com `useMemo` (`useSortedRepos`)
- Cancelamento idempotente de requisições em cleanup do `useEffect`
- Escape automático de conteúdo via React (sem `dangerouslySetInnerHTML`)

---

## Rodando localmente

**Requisitos:** Node.js 18+

```bash
git clone https://github.com/seu-usuario/github-explorer.git
cd github-explorer
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

### Token do GitHub (opcional — evita rate limiting)

Requisições anônimas são limitadas a 60/hora. Crie um arquivo `.env` na raiz:

```
VITE_GITHUB_TOKEN=github_pat_seu_token_aqui
```

Isso eleva o limite para 5.000 requisições/hora. Use um token com escopo de **leitura apenas em repositórios públicos**.

---

## Build de produção

```bash
npm run build     # gera dist/
npm run preview   # visualiza o build localmente
```

---

## Testes

Suíte de testes unitários e de integração com **Vitest** + **React Testing Library**.

```bash
npm test            # modo watch (desenvolvimento)
npm run test:run    # execução única (CI)
npm run test:coverage   # relatório de cobertura
```

**Cobertura atual: 68 testes em 12 arquivos.**

### O que é testado

| Camada | Arquivos | Cobertura |
|---|---|---|
| **Utils puros** | `utils/format.test.js`, `utils/languages.test.js` | Formatação de números, datas, cores de linguagens |
| **API helpers** | `api/github.test.js` | Mapeamento de erros (404, 403, fallback) |
| **Hooks** | `hooks/useAsync.test.js`, `hooks/useSortedRepos.test.js`, `hooks/useRecentSearches.test.js` | Estados de fetch, cancelamento, ordenação, persistência |
| **Componentes** | `LanguageBadge`, `ErrorState`, `SortControls`, `RepoCard`, `UserCard` | Renderização, interação, props |
| **Páginas** | `pages/HomePage.test.jsx` | Fluxo de busca, validação, navegação, recent searches |

Casos notáveis validados:
- `useAsync` cancela requisições em-voo ao desmontar (`AbortSignal`)
- Resoluções tardias após mudança de dependência são ignoradas (proteção contra race conditions)
- `useSortedRepos` não muta o array original
- `useRecentSearches` se recupera de JSON corrompido no localStorage

---

## Docker

```bash
docker compose up --build
```

Disponível em [http://localhost:8080](http://localhost:8080).

Sem o Compose:

```bash
docker build -t github-explorer .
docker run -p 8080:80 github-explorer
```

-

## Estrutura do projeto

```
github-explorer/
├── index.html
├── package.json
├── vite.config.js
├── server.js              # Express para deploy Heroku Node.js
├── Procfile
├── Dockerfile             # Multi-stage: build Node → nginx
├── docker-compose.yml
├── nginx.conf
└── src/
    ├── main.jsx           # Entry — StrictMode + HashRouter
    ├── App.jsx            # Layout + rotas
    ├── api/
    │   └── github.js      # Cliente axios + extração de erro
    ├── hooks/
    │   ├── useAsync.js    # Estado genérico de fetch (useReducer + AbortController)
    │   ├── useGithub.js   # useUser, useUserRepos, useRepo
    │   ├── useRecentSearches.js
    │   └── useSortedRepos.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ErrorBoundary.jsx
    │   ├── ErrorState.jsx
    │   ├── Skeleton.jsx
    │   ├── BackButton.jsx
    │   ├── UserCard.jsx
    │   ├── RepoCard.jsx   # memoizado
    │   ├── RepoList.jsx
    │   ├── RepoDetails.jsx
    │   ├── SortControls.jsx
    │   └── LanguageBadge.jsx
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── UserPage.jsx
    │   ├── RepoPage.jsx
    │   └── NotFoundPage.jsx
    ├── utils/
    │   ├── format.js
    │   └── languages.js
    └── styles/
        └── main.css
```

## APIs utilizadas

| Endpoint | Descrição |
|---|---|
| `GET /users/{username}` | Perfil do usuário |
| `GET /users/{username}/repos?per_page=100` | Repositórios do usuário |
| `GET /repos/{owner}/{repo}` | Detalhes do repositório |
# github-explorer
