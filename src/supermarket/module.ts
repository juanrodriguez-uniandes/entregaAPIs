import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermercado } from './entity';
import { SupermercadoService } from './service';
import { SupermercadoController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supermercado])],
  providers: [SupermercadoService],
  controllers: [SupermercadoController],
})
export class SupermercadoModule {}
