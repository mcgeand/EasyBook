/// <reference types="vite/client" />

// This file is needed for TypeScript support in a Vite project
// It helps TypeScript understand module extensions and environment variables 

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 