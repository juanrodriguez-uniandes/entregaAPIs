import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from 'src/city/entity';
import { Supermercado } from 'src/supermarket/entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CiudadSupermercadoService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Supermercado)
    private readonly supermercadoRepository: Repository<Supermercado>,
  ) {}

  async addSupermarketToCity(
    ciudadId: number,
    supermercadoId: number,
  ): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercados'],
    });
    const supermercado = await this.supermercadoRepository.findOne({
      where: { id: supermercadoId },
    });

    if (!ciudad)
      throw new NotFoundException(`Ciudad con ID ${ciudadId} no encontrada`);
    if (!supermercado)
      throw new NotFoundException(
        `Supermercado con ID ${supermercadoId} no encontrado`,
      );

    ciudad.supermercados.push(supermercado);
    return this.ciudadRepository.save(ciudad);
  }

  async findSupermarketsFromCity(ciudadId: number): Promise<Supermercado[]> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercados'],
    });
    if (!ciudad)
      throw new NotFoundException(`Ciudad con ID ${ciudadId} no encontrada`);
    return ciudad.supermercados;
  }

  async findSupermarketFromCity(
    ciudadId: number,
    supermercadoId: number,
  ): Promise<Supermercado> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercados'],
    });
    if (!ciudad)
      throw new NotFoundException(`Ciudad con ID ${ciudadId} no encontrada`);

    const supermercado = ciudad.supermercados.find(
      (s) => s.id == supermercadoId,
    );
    if (!supermercado)
      throw new NotFoundException(
        `Supermercado con ID ${supermercadoId} no encontrado`,
      );
    return supermercado;
  }

  async updateSupermarketsFromCity(
    ciudadId: number,
    supermercadosIds: string[],
  ): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercados'],
    });

    const supermercados = await this.supermercadoRepository.find({
      where: { id: In(supermercadosIds) },
    });

    if (!ciudad)
      throw new NotFoundException(`Ciudad con ID ${ciudadId} no encontrada`);
    if (supermercados.length !== supermercadosIds.length)
      throw new NotFoundException(`Un supermercado ingresado no existe`);

    ciudad.supermercados = supermercados;
    return this.ciudadRepository.save(ciudad);
  }

  async deleteSupermarketFromCity(
    ciudadId: number,
    supermercadoId: number,
  ): Promise<void> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercados'],
    });
    if (!ciudad)
      throw new NotFoundException(`Ciudad con ID ${ciudadId} no encontrada`);

    ciudad.supermercados = ciudad.supermercados.filter(
      (s) => s.id !== supermercadoId,
    );
    await this.ciudadRepository.save(ciudad);
  }
}
