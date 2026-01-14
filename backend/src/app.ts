import express, { NextFunction } from 'express';
import cors from 'cors';
import apiRouter from './routes/api.routes';
import { config } from './config';

export const isAuth = true;

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
            if(origin === config.frontendOrigin){
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
        return res.status(400).json({
            error : "Invalid json body."
        });
    }
    next(err);
})

app.use('/api',apiRouter);


export default app;