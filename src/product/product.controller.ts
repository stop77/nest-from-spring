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

@UseGuards(LoggedInGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly prodService: ProductService) {}

  @Roles([UserRoleEnum.ADMIN])
  @UseGuards(RoleGuard)
  @Post()
  async addProduct(@Body() dto: RequestAddProductDto) {
    return await this.prodService.addProduct(
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

  @Roles([UserRoleEnum.ADMIN])
  @UseGuards(RoleGuard)
  @Delete(':serial')
  async deleteProduct(@Param('serial') serial: string) {
    await this.prodService.deleteProduct(serial);
  }
}
