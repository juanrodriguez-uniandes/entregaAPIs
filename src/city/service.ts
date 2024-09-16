import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entity';

const PAISES_VALIDOS = ['Argentina', 'Ecuador', 'Paraguay'];

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAll(): Promise<Ciudad[]> {
    return this.ciudadRepository.find({ relations: ['supermercados'] });
  }

  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id },
      relations: ['supermercados'],
    });
    if (!ciudad)
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
    return ciudad;
  }

  async create(ciudad: Ciudad): Promise<Ciudad> {
    if (!PAISES_VALIDOS.includes(ciudad.pais)) {
      throw new BadRequestException(`El país ${ciudad.pais} no es válido`);
    }
    return this.ciudadRepository.save(ciudad);
  }

  async update(id: number, ciudad: Ciudad): Promise<Ciudad> {
    const ciudadExistente = await this.findOne(id);
    if (!PAISES_VALIDOS.includes(ciudad.pais)) {
      throw new BadRequestException(`El país ${ciudad.pais} no es válido`);
    }
    Object.assign(ciudadExistente, ciudad);
    return this.ciudadRepository.save(ciudadExistente);
  }

  async delete(id: number): Promise<void> {
    const ciudad = await this.findOne(id);
    await this.ciudadRepository.remove(ciudad);
  }
}
