import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/Product';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ResponseSearchDto } from './dto/response.search.dto';
import { PageInfo } from './dto/page.info';
import { ProductInfoDto } from './dto/response.product-info.dto';
import { go, map } from '../general/fx';

const DEFAULT_PAGE: number = 5;

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Product)
    private prodRepo: Repository<Product>,
  ) {}

  async getSearch(
    user: User,
    word: string,
    inclusiveTags: string[],
    exclusiveTags: string[],
    pageNumber: number,
  ): Promise<ResponseSearchDto> {
    // 실제 비즈니스 코드에서는 엘라스틱서치 호출. 엘라스틱서치 사용 이전 코드로 모의 작성함.

    const [rmaIdList, alertTags, funcTags, sideEffectTags] =
      this.getSeperatedTags(inclusiveTags, exclusiveTags);

    const query: SelectQueryBuilder<Product> =
      this.prodRepo.createQueryBuilder('product');

    if (rmaIdList.length > 0)
      query.innerJoinAndSelect(
        'product.productRmas',
        'prodRma',
        'prodRma.rmaId IN (:rmaIdList)',
        { rmaIdList },
      );
    if (alertTags.length > 0)
      query.innerJoinAndSelect(
        'product.productAlerts',
        'prodAlert',
        'prodAlert.alert NOT IN (:alertTags)',
        { alertTags },
      );
    if (funcTags.length > 0)
      query.innerJoinAndSelect(
        'product.productFuncs',
        'prodFunc',
        'prodFunc.func IN (:funcTags)',
        { funcTags },
      );

    if (sideEffectTags.length > 0)
      query.innerJoinAndSelect(
        'product.productSideEffects',
        'prodSide',
        'prodSide.sideEffect NOT IN (:sideEffectTags)',
        { sideEffectTags },
      );

    const [targetProductList, totalCount] = await query
      .where('product.name like :name', { name: `%${word}%` })
      .take(DEFAULT_PAGE)
      .skip(DEFAULT_PAGE * (pageNumber - 1))
      .getManyAndCount();

    const pageInfo = new PageInfo();

    pageInfo.isPageable =
      targetProductList.length === DEFAULT_PAGE &&
      totalCount > DEFAULT_PAGE * pageNumber;
    pageInfo.page = pageNumber;
    pageInfo.pageSize = DEFAULT_PAGE;
    pageInfo.totalCount = totalCount;
    pageInfo.totalPageNumber = Math.ceil(totalCount / DEFAULT_PAGE);

    const productInfoList: ProductInfoDto[] = go(
      targetProductList,
      map((a: Product) => {
        const rmaList = a.productRmas.map((a) => a.rma.name);
        const alertList = a.productAlerts.map((a) => a.alert);
        const funcList = a.productFuncs.map((a) => a.func);
        const seList = a.productSideEffects.map((a) => a.sideEffect);

        return new ProductInfoDto(
          a.manufacturer,
          a.name,
          a.serial,
          a.image,
          +a.price,
          rmaList,
          funcList,
          alertList,
          seList,
        );
      }),
    );

    return new ResponseSearchDto(pageInfo, productInfoList);
  }

  private getSeperatedTags(
    inclusiveTags: string[],
    exclusiveTags: string[],
  ): [number[], string[], string[], string[]] {
    // 비즈니스 코드로 비공개 처리.
    // inclusiveTags와 exclusiveTags를 입력받아서 데이터 시트에 의거해 4개의 배열로 나눠서 리턴한다.
    // 편의 상 ProductRma를 제외하고 전부 string으로 처리했지만 사실 Alert, Func, SideEffect 전부 따로 테이블이 있고 전부 Product와 다대다 관계.
    // 따라서 getSeperatedTags의 실제 리턴값은 4개의 DB ID값 배열인 [number[], number[], number[], number[]].
    // 해당 프로젝트에서는 1개의 number 배열과 3개의 string 배열로 대체했고, 그 마저도 비공개 처리하였다.
    return [[15], ['당뇨'], ['간'], ['홍조']];
  }
}
