import { registerAs } from "@nestjs/config";
import {config as dotenvConfig} from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({path: './.env'});

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: true,
    dropSchema: false,
  };
  
  
  
  export default registerAs('typeorm', () => config);
  
  export const connectionSource = new DataSource(config as DataSourceOptions);