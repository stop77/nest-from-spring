import { Module } from '@nestjs/common';
import { CombinationService } from './combination.service';
import { CombinationController } from './combination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combination } from '../entities/Combination';
import { Product } from '../entities/Product';
import { ProductCombination } from '../entities/ProductCombination';

@Module({
  imports: [
    TypeOrmModule.forFeature([Combination, Product, ProductCombination]),
  ],
  controllers: [CombinationController],
  providers: [CombinationService],
})
export class CombinationModule {}
