import dotenv from "dotenv"

if(process.env.NODE_ENV !== "production"){
    dotenv.config({path: ".env.development"})
}

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const SERVER_PORT = process.env.SERVER_PORT;
const DATABASE_URL = process.env.DATABASE_URL;


// Fail fast if required variables are missing

if (!FRONTEND_ORIGIN) {
  throw new Error("FRONTEND_ORIGIN is not defined")
}

if (!SERVER_PORT) {
  throw new Error("SERVER_PORT is not defined")
}

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined")
}

const config = {
  frontendOrigin: FRONTEND_ORIGIN,
  serverPort: Number(SERVER_PORT),
  databaseUrl: DATABASE_URL,
}

export default config;