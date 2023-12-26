import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStore = new AsyncLocalStorage();

export default asyncLocalStore;
