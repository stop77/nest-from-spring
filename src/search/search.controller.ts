import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { User } from '../general/decorator/user.decorator';
import { RequestSearchDto } from './dto/request.search.dto';
import { ResponseSearchDto } from './dto/response.search.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseWrapped } from '../general/api.response.dto';

@ApiTags('SEARCH')
@UseGuards(LoggedInGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post(':pageNumber')
  @ApiOperation({
    summary: '검색 결과를 제공',
  })
  @ApiOkResponseWrapped(ResponseSearchDto)
  async search(
    @User() user,
    @Body() dto: RequestSearchDto,
    @Param('pageNumber') pageNumber: number,
  ): Promise<ResponseSearchDto> {
    return await this.searchService.getSearch(
      user,
      dto.word,
      dto.inclusiveTags,
      dto.exclusiveTags,
      pageNumber,
    );
  }
}
