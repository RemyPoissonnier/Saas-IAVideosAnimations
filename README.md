# React + TypeScript + Vite

![cat image](public/tlogo.png) 

## Purpose

IA Banana est une démo front qui permet de générer des idées et scripts vidéo (2D/3D) pour des chats ou des chiens, avec des prompts rapides type TikTok. Elle propose :
- Un landing neutre (/home), puis des pages spécialisées chats (/cat) et chiens (/dog).
- Un outil de prompt simplifié 2D/3D avec mode avancé (styles, caméra, audio, formats).
- Une navigation pour se connecter, acheter des jetons ou s’abonner, et un header avec sélection de page.
- Une API mock côté front (fetch) pour préparer les appels IA et auth (stockage local).

## How it works

- Front React + Vite, Tailwind pour le style, i18n FR/EN.
- Pages : landing (/home), cats (/cat), dogs (/dog), tokens (/tokens), login (/login).
- PromptTool : saisissez une idée, choisissez 2D/3D, (optionnel) ouvrez les réglages avancés.
- Header : accès Home, tokens, switch chat/chien, login/logout, choix langue/thème.
- Auth et IA : les fichiers `src/api/auth.ts` et `src/api/ia.ts` montrent les endpoints à appeler (mock fetch). Auth est mémorisée en localStorage.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Run the project

From the repo root:

```bash
npm install           # install once
npm run dev           # start Vite dev server (add -- --host to expose on LAN)
npm run build         # production build
npm run preview       # serve the built assets locally
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
