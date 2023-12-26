import { logger } from '@/logger';
import { asyncStorage } from '@/utils';
import { connectLogger } from 'log4js';

const connectLog = connectLogger(logger, {
  level: 'auto',
  format: (_req, _res, next) =>
    next(
      `Trace-Id: ${asyncStorage.traceId()} Remote-Address: :remote-addr - Request: HTTP/:http-version :method ':url' - user: ${asyncStorage.userInfo()
        ?.username} - Status: :status - Content-Length: :content-length - Referrer: :referrer - User-Agent: :user-agent`
    )
});

export default connectLog;
