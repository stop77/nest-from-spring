import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { RequestAddProductDto } from './dto/request.add-product.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../general/decorator/role.decorator';
import { UserRoleEnum } from '../entities/User';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkReponseNull } from '../general/api.response.dto';
import { ExceptionPackage } from '../general/exception.filter';

@ApiTags('PRODUCT')
@UseGuards(LoggedInGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly prodService: ProductService) {}

  @ApiOperation({
    summary: 'Product 테이블에 제품 추가. ADMIN 롤을 가져야 한다.',
  })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '원료 이름이 rma테이블에 없습니다',
  })
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '해당 시리얼을 가진 제품이 이미 존재합니다',
  })
  @ApiResponse({
    status: 500,
    type: ExceptionPackage,
    description: '관리자에게 문의해 주세요.',
  })
  @ApiResponse({
    status: 403,
    type: ExceptionPackage,
    description: 'ADMIN 권한이 필요합니다.',
  })
  @Roles([UserRoleEnum.ADMIN])
  @UseGuards(RoleGuard)
  @Post()
  async addProduct(@Body() dto: RequestAddProductDto) {
    await this.prodService.addProduct(
      dto.gubun,
      dto.image,
      dto.manufacturer,
      dto.name,
      dto.serial,
      dto.price,
      dto.rmaList,
      dto.funcList,
      dto.alertList,
      dto.seList,
    );
  }

  @ApiOperation({
    summary: 'Product 테이블에서 제품 제거. ADMIN 롤을 가져야 한다.',
  })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '해당 시리얼을 가진 제품이 없습니다.',
  })
  @ApiResponse({
    status: 403,
    type: ExceptionPackage,
    description: 'ADMIN 권한이 필요합니다.',
  })
  @Roles([UserRoleEnum.ADMIN])
  @UseGuards(RoleGuard)
  @Delete(':serial')
  async deleteProduct(@Param('serial') serial: string) {
    await this.prodService.deleteProduct(serial);
  }
}
