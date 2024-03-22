import * as path from 'path';

import { dbConfig } from './dbConfig';
import { CustomNamingStrategy } from '../core/CustomNamingStrategy';
import * as AllEntities from '../entities';
import { databaseUriToConnection } from '../utils/databaseUriToConnection';

const subscribersPath = path.join(__dirname, '..', 'subscribers', '**', '*Subscriber{ts,js}');
const migrationsPath = path.join(__dirname, '..', 'migrations', '*');
export const connectionOptions = databaseUriToConnection(dbConfig.databaseUrlString, {
    namingStrategy: new CustomNamingStrategy(),
    synchronize: dbConfig.sync,
    logging: dbConfig.log,
    cache: {
        type: 'database',
        tableName: 'tbl_caches',
    },
    entities: Object.values(AllEntities),
    subscribers: [subscribersPath],
    migrations: [migrationsPath],
    migrationsTableName: 'tbl_migrations',
    migrationsRun: true,
});
