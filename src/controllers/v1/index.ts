import { Route } from '@/types';
import { Router } from 'express';
import bucketRouter from './buckets';
import objectRouter from './objects';

const router = Router();

const routes: Route[] = [
  {
    path: '/buckets',
    requestHandler: bucketRouter
  },
  {
    path: '/objects',
    requestHandler: objectRouter
  }
];

routes.forEach(({ path, requestHandler }) => {
  router.use(path, requestHandler);
});

export default router;
