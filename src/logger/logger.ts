import { asyncStorage } from '@/utils';
import { addLayout, configure, getLogger } from 'log4js';
import { inspect } from 'util';

addLayout(
  'json',
  () => (logEvent) =>
    JSON.stringify({
      traceId: asyncStorage.traceId(),
      ...logEvent,
      data: logEvent.data.map((value) => inspect(value, { depth: null }))
    })
);

configure({
  appenders: {
    dev: { type: 'stdout', layout: { type: 'colored' } },
    prod: { type: 'stdout', layout: { type: 'json', separator: ',' } }
  },
  categories: {
    default: {
      appenders: ['dev'],
      level: 'debug',
      enableCallStack: true
    },
    prod: {
      appenders: ['prod'],
      level: 'debug',
      enableCallStack: true
    }
  }
});

const logger = process.env.NODE_ENV === 'production' ? getLogger('prod') : getLogger('default');

export default logger;
