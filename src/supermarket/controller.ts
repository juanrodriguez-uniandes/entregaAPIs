import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SupermercadoService } from './service';
import { Supermercado } from './entity';
@Controller('supermarkets')
export class SupermercadoController {
  constructor(private readonly supermercadoService: SupermercadoService) {}

  @Get()
  findAll() {
    return this.supermercadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.supermercadoService.findOne(id);
  }

  @Post()
  create(@Body() supermercado: Supermercado) {
    return this.supermercadoService.create(supermercado);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() supermercado: Supermercado) {
    return this.supermercadoService.update(id, supermercado);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.supermercadoService.delete(id);
  }
}
