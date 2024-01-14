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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Health,
      UserAddition,
      CalcTarget,
      Combination,
      Product,
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService, ProductService],
})
export class HomeModule {}
