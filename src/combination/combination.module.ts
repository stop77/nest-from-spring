import { Module } from '@nestjs/common';
import { CombinationService } from './combination.service';
import { CombinationController } from './combination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combination } from '../entities/Combination';

@Module({
  imports: [TypeOrmModule.forFeature([Combination])],
  controllers: [CombinationController],
  providers: [CombinationService],
})
export class CombinationModule {}
