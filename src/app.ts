import express from 'express';
import indexRouter from './routes/index.routes';
import authRouter from './routes/auth.routes';
import dashboardRouter from './routes/dashboard.routes';

const app = express();
app.use(express.json());

app.use(indexRouter);
app.use(authRouter);
app.use(dashboardRouter);

export default app;