import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supermercado } from './entity';

@Injectable()
export class SupermercadoService {
  constructor(
    @InjectRepository(Supermercado)
    private readonly supermercadoRepository: Repository<Supermercado>,
  ) {}

  async findAll(): Promise<Supermercado[]> {
    return this.supermercadoRepository.find({ relations: ['ciudades'] });
  }

  async findOne(id: number): Promise<Supermercado> {
    const supermercado = await this.supermercadoRepository.findOne({
      where: { id },
      relations: ['ciudades'],
    });
    if (!supermercado)
      throw new NotFoundException(`Supermercado con ID ${id} no encontrado`);
    return supermercado;
  }

  async create(supermercado: Supermercado): Promise<Supermercado> {
    if (supermercado.nombre.length < 10) {
      throw new BadRequestException(
        'El nombre del supermercado debe tener más de 10 caracteres',
      );
    }
    return this.supermercadoRepository.save(supermercado);
  }

  async update(id: number, supermercado: Supermercado): Promise<Supermercado> {
    const supermercadoExistente = await this.findOne(id);
    if (supermercado.nombre.length < 10) {
      throw new BadRequestException(
        'El nombre del supermercado debe tener más de 10 caracteres',
      );
    }
    Object.assign(supermercadoExistente, supermercado);
    return this.supermercadoRepository.save(supermercadoExistente);
  }

  async delete(id: number): Promise<void> {
    const supermercado = await this.findOne(id);
    await this.supermercadoRepository.remove(supermercado);
  }
}
