import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitySupermarketModule } from './city-supermarket/module';
import { Ciudad } from './city/entity';
import { CiudadModule } from './city/module';
import { Supermercado } from './supermarket/entity';
import { SupermercadoModule } from './supermarket/module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Ciudad, Supermercado],
      synchronize: true,
    }),
    CiudadModule,
    SupermercadoModule,
    CitySupermarketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
