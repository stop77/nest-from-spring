import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecommendCache } from '../entities/RecommendCache';
import { User } from '../entities/User';
import {
  CombElemDto,
  EssentialDiffElem,
  ResponseRecommendDto,
} from './dto/response.recommend.dto';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Combination } from '../entities/Combination';
import { go, map } from '../general/fx';
import { ResponseEssentialRecommendDto } from './dto/response.essential-recommend.dto';

@Injectable()
export class RecommendService {
  constructor(
    @InjectRepository(RecommendCache)
    private cacheRepo: Repository<RecommendCache>,
    @InjectRepository(Combination)
    private combRepo: Repository<Combination>,
  ) {}

  @Transactional()
  async getRecommend(user: User): Promise<ResponseRecommendDto> {
    let target: RecommendCache = await this.cacheRepo.findOne({
      where: { userId: user.id },
    });
    if (target == null) {
      target = RecommendCache.create(user);
      target = await this.cacheRepo.save(target);
    }

    const combList: Combination[] = await this.combRepo.find({
      where: { userId: user.id },
    });

    const combDtoList = go(
      combList,
      map((a: Combination) => new CombElemDto(a.name, a.thumbnail, a.defaults)),
    );

    if (!target.cacheFlag) {
      return new ResponseRecommendDto(false, null, null, null, combDtoList);
    } else {
      const nutritionScoreList: EssentialDiffElem[] =
        this.getEssenDiffElemListFromCache(target);

      return new ResponseRecommendDto(
        true,
        target.additionalScore,
        target.additionalPrice,
        nutritionScoreList,
        combDtoList,
      );
    }
  }

  async getEssentialRecommend(
    user: User,
  ): Promise<ResponseEssentialRecommendDto> {
    // 비즈니스 코드로 비공개 처리. Response 견본을 리턴.
    return new ResponseEssentialRecommendDto(0, 100, 9000, [], []);
  }

  private getEssenDiffElemListFromCache(
    cache: RecommendCache,
  ): EssentialDiffElem[] {
    const res: EssentialDiffElem[] = [];

    if (cache.vitaminA) {
      res.push(
        new EssentialDiffElem('비타민a', cache.vitaminA, cache.vitaminAAfter),
      );
    }
    if (cache.vitaminB12) {
      res.push(
        new EssentialDiffElem(
          '비타민b12',
          cache.vitaminB12,
          cache.vitaminB12After,
        ),
      );
    }
    if (cache.vitaminD) {
      res.push(
        new EssentialDiffElem('비타민d', cache.vitaminD, cache.vitaminDAfter),
      );
    }

    if (cache.vitaminE) {
      res.push(
        new EssentialDiffElem('비타민e', cache.vitaminE, cache.vitaminEAfter),
      );
    }
    if (cache.zinc) {
      res.push(new EssentialDiffElem('아연', cache.zinc, cache.zincAfter));
    }
    if (cache.magnesium) {
      res.push(
        new EssentialDiffElem(
          '마그네슘',
          cache.magnesium,
          cache.magnesiumAfter,
        ),
      );
    }
    if (cache.selenium) {
      res.push(
        new EssentialDiffElem('셀레늄', cache.selenium, cache.seleniumAfter),
      );
    }
    if (cache.cooper) {
      res.push(new EssentialDiffElem('구리', cache.cooper, cache.cooperAfter));
    }
    if (cache.omega3) {
      res.push(
        new EssentialDiffElem('오메가3', cache.omega3, cache.omega3After),
      );
    }
    if (cache.calcium) {
      res.push(
        new EssentialDiffElem('칼슘', cache.calcium, cache.calciumAfter),
      );
    }
    if (cache.vitaminC) {
      res.push(
        new EssentialDiffElem('비타민c', cache.vitaminC, cache.vitaminCAfter),
      );
    }
    if (cache.iron) {
      res.push(new EssentialDiffElem('철', cache.iron, cache.ironAfter));
    }
    if (cache.coq10) {
      res.push(
        new EssentialDiffElem('코엔자임q10', cache.coq10, cache.coq10After),
      );
    }

    return res;
  }
}
