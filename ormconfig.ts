import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { UserAddition } from './src/entities/UserAddition';
import { User } from './src/entities/User';
import { Badrelations } from './src/entities/Badrelations';
import { CalcTarget } from './src/entities/CalcTarget';
import { Combination } from './src/entities/Combination';
import { Health } from './src/entities/Health';
import { HffRma } from './src/entities/HffRma';
import { MedicAi } from './src/entities/MedicAi';
import { MedicProduct } from './src/entities/MedicProduct';
import { MedicProductAi } from './src/entities/MedicProductAi';
import { NutritionScore } from './src/entities/NutritionScore';
import { Product } from './src/entities/Product';
import { ProductCombination } from './src/entities/ProductCombination';
import { ProductRma } from './src/entities/ProductRma';
import { RecommendCache } from './src/entities/RecommendCache';
import { UserIntaking } from './src/entities/UserIntaking';
import { UserProduct } from './src/entities/UserProduct';

dotenv.config();

const config: TypeOrmModuleOptions = {
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
    MedicAi,
    MedicProduct,
    MedicProductAi,
    NutritionScore,
    Product,
    ProductCombination,
    ProductRma,
    RecommendCache,
    User,
    UserAddition,
    UserIntaking,
    UserProduct,
  ],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
  keepConnectionAlive: true, // 핫 리로딩 시 연결 유지를 위해서 개발단계에서 true로 설정
};

export = config;
