import { DB_CONNECTION_TOKEN } from '/@/constants/system.constant';
import { MONGO_DB } from '/@/app.config';

import mongoose from 'mongoose';
import logger from '/@/utils/logger';

export const DatabaseProvider = {
  provide: DB_CONNECTION_TOKEN,
  useFactory: async () => {
    const RECONNECT_INTERVAL = 6 * 1000;

    let reconnectionTask: Nullable<NodeJS.Timeout> = null;

    const connection = () => {
      return mongoose.connect(MONGO_DB.uri, {});
    };

    mongoose.connection.on('connecting', () => {
      logger.info('[MongoDB]', 'connecting...');
    });

    mongoose.connection.on('open', () => {
      logger.info('[MongoDB]', 'readied!...');

      if (reconnectionTask) {
        clearTimeout(reconnectionTask);
        reconnectionTask = null;
      }
    });

    mongoose.connection.on('disconnected', () => {
      logger.error(
        '[MongoDB]',
        `disconnected! retry when after ${RECONNECT_INTERVAL / 1000}s`,
      );
    });

    mongoose.connection.on('error', (error) => {
      logger.error('[MongoDB]', 'effor!', error);
      mongoose.disconnect();
    });

    return await connection();
  },
};
