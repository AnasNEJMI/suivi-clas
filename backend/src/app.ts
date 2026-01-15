import "dotenv/config";

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
if (!FRONTEND_ORIGIN) {
  throw new Error("FRONTEND_ORIGIN is not defined")
}

import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.routes';
import { errorHandler } from "./middleware/errorHandler.middleware";
import { ApiError } from "./classes/ApiError.class";


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

app.use(express.json());

app.use((err: unknown, req: express.Request, res: express.Response, next : express.NextFunction) => {
    //if syntax error, return json body
    if(err instanceof SyntaxError){
        next(ApiError.invalidJsonBodyError())
    }else{
        next(ApiError.internalError());
    }
})


app.use('/api',apiRouter);

app.use((req: express.Request, res: express.Response, next : express.NextFunction) => {
    next(ApiError.routeNotFound())
});

app.use(errorHandler);

export default app;