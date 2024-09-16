import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CiudadService } from './service';
import { Ciudad } from './entity';

@Controller('cities')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  findAll() {
    return this.ciudadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ciudadService.findOne(id);
  }

  @Post()
  create(@Body() ciudad: Ciudad) {
    return this.ciudadService.create(ciudad);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() ciudad: Ciudad) {
    return this.ciudadService.update(id, ciudad);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.ciudadService.delete(id);
  }
}
