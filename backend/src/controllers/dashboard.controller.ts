import { Request, Response } from 'express';

export const dashboardHandler = (req: Request, res: Response) => {

    res.json({ message: 'Dashboard data' });
};