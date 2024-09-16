import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CiudadSupermercadoService } from './service';

@Controller('cities/:cityId/supermarkets')
export class CiudadSupermercadoController {
  constructor(
    private readonly ciudadSupermercadoService: CiudadSupermercadoService,
  ) {}

  @Post(':supermarketId')
  addSupermarketToCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number,
  ) {
    return this.ciudadSupermercadoService.addSupermarketToCity(
      cityId,
      supermarketId,
    );
  }

  @Get()
  findSupermarketsFromCity(@Param('cityId') cityId: number) {
    return this.ciudadSupermercadoService.findSupermarketsFromCity(cityId);
  }

  @Get(':supermarketId')
  findSupermarketFromCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number,
  ) {
    return this.ciudadSupermercadoService.findSupermarketFromCity(
      cityId,
      supermarketId,
    );
  }

  @Put()
  updateSupermarketsFromCity(
    @Param('cityId') cityId: number,
    @Body() supermercados: { supermarketIds: string[] },
  ) {
    return this.ciudadSupermercadoService.updateSupermarketsFromCity(
      cityId,
      supermercados.supermarketIds,
    );
  }

  @Delete(':supermarketId')
  deleteSupermarketFromCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number,
  ) {
    return this.ciudadSupermercadoService.deleteSupermarketFromCity(
      cityId,
      supermarketId,
    );
  }
}
