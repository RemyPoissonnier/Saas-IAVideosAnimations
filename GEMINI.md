# Gemini Project Context: IAGenerationContent

## Project Overview

This project is a React-based frontend application called "Whisker Studio" (internally named "IA Banana"). It serves as a demo for a SaaS platform that allows users to generate 2D/3D video ideas and scripts, primarily featuring cats and dogs, using a simple prompt-based interface.

The application is built with a modern web stack:

*   **Framework:** React 19 with Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS with a custom theming system (light/dark modes).
*   **Routing:** `react-router-dom` for all navigation.
*   **State Management/Data Fetching:** `@tanstack/react-query` is used for managing server state, caching, and handling API requests.
*   **Animation:** The UI is rich with animations, using `framer-motion`, `gsap`, and custom CSS animations. 3D elements are rendered using `@react-three/fiber` and `@react-three/drei`.
*   **Internationalization (i18n):** The app supports English and French, with custom scripts (`addI18n.js`, `tools/process-i18n.js`) to manage translation keys.
*   **Authentication:** A client-side authentication flow is implemented using React Context (`AuthContext`) and `localStorage` for persistence.

The core user journey involves:
1.  Exploring the landing page which showcases the app's capabilities.
2.  Using the `PromptTool` to input an idea for a video.
3.  Selecting options like format (2D/3D), style, and tone.
4.  Generating the video, which involves mock API calls to a backend service.
5.  Users can also manage their account, purchase tokens, or subscribe.

## Building and Running

### Prerequisites
- Node.js and npm

### Key Commands

The project uses `npm` as its package manager. The main scripts are defined in `package.json`:

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run the development server:**
    Starts the app on `http://localhost:5173` with Hot Module Replacement (HMR).
    ```bash
    npm run dev
    ```
*   **Build for production:**
    Transpiles TypeScript, bundles the code, and outputs the static assets to the `dist/` directory.
    ```bash
    npm run build
    ```
*   **Lint the code:**
    Runs ESLint to check for code quality and style issues.
    ```bash
    npm run lint
    ```
*   **Preview the production build:**
    Serves the `dist/` directory locally to test the production build.
    ```bash
    npm run preview
    ```

## Development Conventions

*   **Component Structure:** Components are organized by feature (e.g., `generator`, `landingPage`) or type (e.g., `ui`, `hooks`).
*   **Styling:** Tailwind CSS is the primary styling solution. A custom theme is defined in `tailwind.config.js` and `src/theme.tsx`, using CSS variables for colors to support light and dark modes.
*   **API Interaction:** API calls are centralized in `src/api/`. The app uses `@tanstack/react-query` to handle fetching, caching, and state management for API data. The API endpoint is configured via the `VITE_IA_API_BASE` environment variable.
*   **State Management:**
    *   Global authentication state is managed via `AuthContext`.
    *   Server state (API data) is managed with `@tanstack/react-query`.
    *   Local component state is managed with `useState`.
*   **Internationalization (i18n):**
    *   Translation strings are stored in `src/i18n/en.ts` and `src/i18n/fr.ts`.
    *   The `useI18n` hook provides the `t` function for translations.
    *   Use the provided Node.js scripts (`addI18n.js` or `tools/process-i18n.js`) to add or update translation keys to ensure consistency.
*   **Coding Style:** The project uses ESLint with `typescript-eslint` to enforce a consistent coding style. Refer to the `eslint.config.js` file for specific rules. The configuration follows the flat config format.
