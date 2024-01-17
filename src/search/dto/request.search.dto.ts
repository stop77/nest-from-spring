import { ApiProperty } from '@nestjs/swagger';
import { SearchWord } from '../../general/decorator/searchword.decorator';

export class RequestSearchDto {
  @ApiProperty({ example: '종근당', description: '검색에 사용할 단어' })
  @SearchWord()
  word: string;

  @ApiProperty({
    example: ['간', '눈'],
    description: '검색에서 포함할 태그 목록',
  })
  inclusiveTags: string[];

  @ApiProperty({
    example: ['심장', '위'],
    description: '검색에서 제외할 태그 목록',
  })
  exclusiveTags: string[];
}
