import { CustomError } from '@/utils';
import { NextFunction, Request, Response } from 'express';

const unhandledRoutes = (req: Request, _res: Response, next: NextFunction) => {
  const err = new CustomError(`Can't find '${req.originalUrl}' on the server!`, 404);
  next(err);
};

export default unhandledRoutes;
