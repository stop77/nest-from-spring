import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combination } from '../entities/Combination';
import { Product } from '../entities/Product';
import { ProductController } from './product.controller';
import { ProductRma } from '../entities/ProductRma';
import { ProductAlert } from '../entities/ProductAlert';
import { ProductFunc } from '../entities/ProductFunc';
import { ProductSideEffect } from '../entities/ProductSideEffect';
import { HffRma } from '../entities/HffRma';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Combination,
      Product,
      ProductRma,
      ProductAlert,
      ProductFunc,
      ProductSideEffect,
      HffRma,
    ]),
  ],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
