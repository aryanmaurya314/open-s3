import dotenv from 'dotenv';
import { ENV } from './types';

const dotEnv: ENV = {
  development: '.env/development',
  production: '.env/production'
};

dotenv.config({ path: dotEnv[(process.env.ENV ?? 'development') as keyof typeof dotEnv] });
