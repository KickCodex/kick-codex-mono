import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const databaseUriToConnection = (
    uri: string,
    options: Omit<BaseDataSourceOptions, 'type'>,
): DataSourceOptions => {
    const databaseUrl = new URL(uri);
    switch (databaseUrl.protocol) {
        case 'mysql:':
        case 'mariadb:':
            return {
                ...parseMysqlUri(databaseUrl),
                ...options,
            } as MysqlConnectionOptions;

        case 'sqlite:':
            return {
                ...parseSqliteUri(databaseUrl),
                ...options,
            } as SqliteConnectionOptions;

        default:
            throw new Error(`Unsupported or no implemented database protocol: ${databaseUrl.protocol}`);
    }
};

const parseMysqlUri = (databaseUrl: URL): MysqlConnectionOptions => {
    const { protocol, hostname, port, username, password, pathname } = databaseUrl;
    const type = protocol.slice(0, -1) as 'mariadb' | 'mysql';
    return {
        type,
        host: hostname,
        port: Number(port),
        username,
        password,
        database: pathname.slice(1),
        charset: 'utf8mb4_unicode_ci',
    };
};

const parseSqliteUri = (databaseUrl: URL): SqliteConnectionOptions => {
    return {
        type: 'sqlite',
        database: databaseUrl.hostname,
    };
};
