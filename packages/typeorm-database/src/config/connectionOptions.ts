import * as path from 'path';

import { dbConfig } from './dbConfig';
import { CustomNamingStrategy } from '../core/CustomNamingStrategy';
import { BrandEntity } from '../entities/BrandEntity';
import { ColorEntity } from '../entities/ColorEntity';
import { ContributionEntity } from '../entities/ContributionEntity';
import { ImageEntity } from '../entities/ImageEntity';
import { ModelEntity } from '../entities/ModelEntity';
import { SneakerEntity } from '../entities/SneakerEntity';
import { UserEntity } from '../entities/UserEntity';
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
    entities: [BrandEntity, ColorEntity, ContributionEntity, ImageEntity, ModelEntity, SneakerEntity, UserEntity],
    subscribers: [subscribersPath],
    migrations: [migrationsPath],
    migrationsTableName: 'tbl_migrations',
    migrationsRun: true,
});
