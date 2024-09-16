import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/city/entity';
import { Supermercado } from 'src/supermarket/entity';
import { CiudadSupermercadoController } from './controller';
import { CiudadSupermercadoService } from './service';
import { CiudadService } from 'src/city/service';
import { SupermercadoService } from 'src/supermarket/service';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, Supermercado])],
  controllers: [CiudadSupermercadoController],
  providers: [CiudadSupermercadoService, CiudadService, SupermercadoService],
  exports: [CiudadSupermercadoService],
})
export class CitySupermarketModule {}
