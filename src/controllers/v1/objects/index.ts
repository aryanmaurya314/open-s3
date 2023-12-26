import { Router } from 'express';
import { Route } from '@/types';
import { asyncErrorHandler, upload } from '@/middlewares';
import createOne from './createOne';
import findAll from './findAll';
import deleteOne from './deleteOne';
import findOne from './findOne';

const router = Router();

const routes: Route[] = [
  {
    method: 'post',
    path: '/:bucketName/:objectKey',
    middlewares: upload.single('object'),
    requestHandler: createOne
  },
  {
    method: 'get',
    path: '/:bucketName',
    requestHandler: findAll
  },
  {
    method: 'get',
    path: '/:bucketName/:objectKey',
    requestHandler: findOne
  },
  {
    method: 'delete',
    path: '/:bucketName/:objectKey',
    requestHandler: deleteOne
  }
];

routes.forEach(({ method, path, middlewares = [], requestHandler }) => {
  router[method!](path, middlewares, asyncErrorHandler(requestHandler));
});

export default router;
