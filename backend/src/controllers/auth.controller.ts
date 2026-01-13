import { Request, Response } from 'express';
import { isAuth } from '../app';

export const loginHandler = (req: Request, res: Response) => {
  
  res.json({ auth : isAuth});
};