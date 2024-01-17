import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { UserAddition } from './src/entities/UserAddition';
import { User } from './src/entities/User';
import { Badrelations } from './src/entities/Badrelations';
import { CalcTarget } from './src/entities/CalcTarget';
import { Combination } from './src/entities/Combination';
import { Health } from './src/entities/Health';
import { HffRma } from './src/entities/HffRma';
import { Product } from './src/entities/Product';
import { ProductCombination } from './src/entities/ProductCombination';
import { ProductRma } from './src/entities/ProductRma';
import { RecommendCache } from './src/entities/RecommendCache';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { ProductAlert } from './src/entities/ProductAlert';
import { ProductFunc } from './src/entities/ProductFunc';
import { ProductSideEffect } from './src/entities/ProductSideEffect';

dotenv.config();

const config: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      Badrelations,
      CalcTarget,
      Combination,
      Health,
      HffRma,
      Product,
      ProductCombination,
      ProductRma,
      RecommendCache,
      User,
      UserAddition,
      ProductAlert,
      ProductFunc,
      ProductSideEffect,
    ],
    charset: 'utf8mb4',
    synchronize: false,
    logging: true,
    keepConnectionAlive: true, // 핫 리로딩 시 연결 유지를 위해서 개발단계에서 true로 설정
  }),
  async dataSourceFactory(option) {
    if (!option) throw new Error('Invalid options passed');
    return addTransactionalDataSource(new DataSource(option));
  },
};

export = config;
