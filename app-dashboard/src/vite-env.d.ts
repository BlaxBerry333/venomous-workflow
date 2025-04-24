/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  VITE_APP_NAME: string;
  VITE_APP_SERIES_NAME: string;
  VITE_APP_DASHBOARD_NAME: string;
  VITE_APP_SERVER_NAME: string;

  VITE_APP_DASHBOARD_USE_MOCK_DATA: string;

  VITE_APP_DASHBOARD_SERVER_PORT: string;
  VITE_APP_DASHBOARD_DOMAIN: string;
  VITE_APP_SERVER_DOMAIN: string;
}
