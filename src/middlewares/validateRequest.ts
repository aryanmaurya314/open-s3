import { RequestValidators } from '@/types';
import { CustomError } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const validateRequest =
  (validators: RequestValidators) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }

      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }

      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        error = new CustomError(error.message, 422);
      }
      next(error);
    }
  };

export default validateRequest;
