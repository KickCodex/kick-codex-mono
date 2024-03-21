import dotenv from 'dotenv';
import * as process from 'process';

import EnvClass from './EnvClass';

try {
    dotenv.config();
} catch (error) {
    const message = `Failed to load or expand environment variables due to ${(error as Error).message}`;
    throw new Error(message);
}
const Env = new EnvClass(process.env);

export default Env;
