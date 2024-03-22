import Env from '../utils/Env';

export const dbConfig = {
    databaseUrlString: Env.asString('DATABASE_URL'),
    sync: String(process.env.DATABASE_SYNC) === 'true',
    log: String(process.env.DATABASE_LOG) === 'true',
};
