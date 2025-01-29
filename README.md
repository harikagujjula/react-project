# LearningReact

This project was generated with React version ^18(using vite build tool(https://vite.dev/guide/)).

## Initial setup

Clone and run `npm install` for the first time to install all the required packages.

## Development server

- Run `npm run dev` for a dev server. Navigate to `http://localhost:5173/`.
  The application will automatically reload if you change any of the source files.
- `npm build` for Prod build.
- To setup ESLINT with vite:
  1. Install ESLint and Vite Plugin
    `npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev`
  2. Create ESLint Configuration (.eslintrc.json) in the root of your project with
    following content:
      ```
        {
          "extends": "react-app"
        }
      ```
  3. Edit Vite Configuration (vite.config.js), to include ESLint as a plugin.
      Modified code:
      ```
        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        import eslint from "vite-plugin-eslint";

        // https://vitejs.dev/config/
        export default defineConfig({
          plugins: [react(), eslint()],
        });
      ```


