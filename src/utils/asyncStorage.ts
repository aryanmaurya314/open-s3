import { Record } from '@/types';
import asyncLocalStore from './asyncLocalStore';

const store = () => (asyncLocalStore.getStore() ?? {}) as Record;

const asyncStorage = {
  store: () => store(),
  traceId: () => store().traceId as string,
  userInfo: () => store().userInfo as Record
};

export default asyncStorage;
