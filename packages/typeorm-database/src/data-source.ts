import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { connectionOptions } from './config/connectionOptions';
export const AppDataSource = new DataSource(connectionOptions);

export const connectIfNeeded = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
};
