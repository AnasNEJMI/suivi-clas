import "dotenv/config";

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
if (!FRONTEND_ORIGIN) {
  throw new Error("FRONTEND_ORIGIN is not defined")
}

import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.routes';


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
        return res.status(400).json({
            error : "Invalid json body."
        });
    }
    next(err);
})

app.use('/api',apiRouter);


export default app;