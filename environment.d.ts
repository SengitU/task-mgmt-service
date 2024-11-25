declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION_URL: string;
      JWT_SECRET_KEY: string;
    }
  }
}

export {};
