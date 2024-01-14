import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combination } from '../entities/Combination';
import { Product } from '../entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Combination, Product])],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
