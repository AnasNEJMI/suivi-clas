import "dotenv/config";

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
if (!FRONTEND_ORIGIN) {
  throw new Error("FRONTEND_ORIGIN is not defined")
}

import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.routes';
import { errorHandler } from "./middleware/errorHandler.middleware";
import cookieParser from "cookie-parser";
import jsonSyntaxHandler from "./middleware/jsonSyntaxHandler.middleware";
import routeNotFoundHandler from "./middleware/routeNotFound.middleware";


console.log('FRONTEND_ORIGIN', FRONTEND_ORIGIN)

const app = express();

app.use(
    cors({
        origin : (origin, callback) => {
            console.log(origin)
            //allow non-browser origins
            if (!origin) {
                return callback(null, true)
            }

            // Allow only the configured frontend origin
            if(origin === FRONTEND_ORIGIN){
                return callback(null, true);
            }

            // Reject everything else
            return callback(new Error("Not allowed by CORS"))
        },
        methods : ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders : ["Content-Type", "Authorization"],
        credentials : true,
    })
)

app.use(cookieParser());
app.use(express.json());

app.use(jsonSyntaxHandler)

app.use('/api',apiRouter);

app.use(routeNotFoundHandler);
app.use(errorHandler);

export default app;