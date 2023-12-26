import express, { Application, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { auth, connectLog, errorHandler, registerTraceId, unhandledRoutes } from './middlewares';
import controllersV1 from './controllers';

const app: Application = express();

app.set('trust proxy', true);
app.use(helmet());
app.use(cors());
app.use(json({ limit: '5mb' }));
app.use(urlencoded({ extended: false }));

app.get('/health', (_req, res) => {
  res.status(200).send('Good to go!\n');
});

app.use(registerTraceId);
app.use(auth);
app.use(connectLog);
app.use('/api', controllersV1);
app.all('*', unhandledRoutes);
app.use(errorHandler);

export default app;
