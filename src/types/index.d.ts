import { AnyZodObject } from 'zod';

export type Record = { [key: string]: any };

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type Route = {
  method?: HttpMethod;
  path: string;
  middlewares?: any;
  requestHandler: any;
};

export type ENV = {
  development: string;
  production: string;
};

export type RequestValidators = {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
};
