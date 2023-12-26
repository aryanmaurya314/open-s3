import { Route } from '@/types';
import { Router } from 'express';
import versionV1 from './v1';

const router = Router();

const routes: Route[] = [
  {
    path: '/v1',
    requestHandler: versionV1
  }
];

routes.forEach(({ path, requestHandler }) => {
  router.use(path, requestHandler);
});

export default router;
