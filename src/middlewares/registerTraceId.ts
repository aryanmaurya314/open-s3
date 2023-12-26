import { asyncLocalStore } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const registerTraceId = (_req: Request, _res: Response, next: NextFunction) => {
  asyncLocalStore.enterWith({ traceId: uuidv4() });
  next();
};

export default registerTraceId;
