import { ApiProperty } from '@nestjs/swagger';

export class PageInfo {
  @ApiProperty({
    example: true,
    description: '아직 더 페이징 할 수 있는지 여부',
  })
  isPageable: boolean;
  @ApiProperty({ example: 123, description: '전체 페이지 개수' })
  totalPageNumber: number;

  @ApiProperty({ example: 22, description: '현재 페이지' })
  page: number;

  @ApiProperty({ example: 5, description: '페이지 당 결과 개수' })
  pageSize: number;

  @ApiProperty({ example: 615, description: '전체 결과 개수' })
  totalCount: number;
}
