import { SearchWord } from '../../general/decorator/searchword.decorator';

export class RequestSearchDto {
  @SearchWord()
  word: string;

  inclusiveTags: string[];

  exclusiveTags: string[];
}
