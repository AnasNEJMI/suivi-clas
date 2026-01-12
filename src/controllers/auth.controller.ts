import { Request, Response } from 'express';

export const loginHandler = (req: Request, res: Response) => {
  
  res.json({ message: 'Login endpoint' });
};