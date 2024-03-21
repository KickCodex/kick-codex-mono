import 'reflect-metadata';

import { AppDataSource } from './data-source';
import { UserEntity } from './entities/UserEntity';

AppDataSource.initialize()
    .then(async datasource => {
        const users = await UserEntity.find();
        console.log('Loaded users: ', users);

        console.log('Here you can setup and run express / fastify / any other framework.');
    })
    .catch(error => console.log(error));
