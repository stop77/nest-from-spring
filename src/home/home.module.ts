import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Health } from '../entities/Health';
import { UserAddition } from '../entities/UserAddition';
import { CalcTarget } from '../entities/CalcTarget';
import { ProductService } from '../product/product.service';
import { Combination } from '../entities/Combination';
import { Product } from '../entities/Product';
import { ProductRma } from '../entities/ProductRma';
import { ProductAlert } from '../entities/ProductAlert';
import { ProductFunc } from '../entities/ProductFunc';
import { ProductSideEffect } from '../entities/ProductSideEffect';
import { HffRma } from '../entities/HffRma';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Health,
      UserAddition,
      CalcTarget,
      Combination,
      Product,
      ProductRma,
      ProductAlert,
      ProductFunc,
      ProductSideEffect,
      HffRma,
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService, ProductService],
})
export class HomeModule {}
