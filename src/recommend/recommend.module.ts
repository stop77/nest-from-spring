import { Module } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendController } from './recommend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendCache } from '../entities/RecommendCache';
import { Combination } from '../entities/Combination';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendCache, Combination])],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}
