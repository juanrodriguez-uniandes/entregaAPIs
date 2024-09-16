import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entity';
import { CiudadService } from './service';
import { CiudadController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad])],
  providers: [CiudadService],
  controllers: [CiudadController],
})
export class CiudadModule {}
