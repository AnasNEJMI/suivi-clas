import express from 'express';
import indexRouter from './routes/index.routes';
import authRouter from './routes/auth.routes';
import dashboardRouter from './routes/dashboard.routes';

export const isAuth = true;

const app = express();
app.use(express.json());

app.use('/api',authRouter);
app.use(indexRouter);
app.use(dashboardRouter);


export default app;