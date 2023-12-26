import { logger } from '@/logger';
import { CustomError } from '@/utils';
import { NextFunction, Request, Response } from 'express';

const devErrors = (res: Response, err: CustomError) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stackTrace: err.stack,
    error: err
  });
};

const prodErrors = (res: Response, err: CustomError) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: 'Something went wrong! Please try again later.'
    });
  }
};

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  logger.error(err);

  if (process.env.NODE_ENV === 'development') {
    devErrors(res, err);
  } else {
    prodErrors(res, err);
  }
};

export default errorHandler;
