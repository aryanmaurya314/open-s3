import { Router } from 'express';
import validateRequest from '@/middlewares/validateRequest';
import { Bucket } from '@/models/bucket';
import { Route } from '@/types';
import { asyncErrorHandler } from '@/middlewares';
import createOne from './createOne';
import findAll from './findAll';
import deleteOne from './deleteOne';

const router = Router();

const routes: Route[] = [
  {
    method: 'post',
    path: '/',
    middlewares: validateRequest({ body: Bucket }),
    requestHandler: createOne
  },
  {
    method: 'get',
    path: '/',
    requestHandler: findAll
  },
  {
    method: 'delete',
    path: '/:bucketName',
    requestHandler: deleteOne
  }
];

routes.forEach(({ method, path, middlewares = [], requestHandler }) => {
  router[method!](path, middlewares, asyncErrorHandler(requestHandler));
});

export default router;
