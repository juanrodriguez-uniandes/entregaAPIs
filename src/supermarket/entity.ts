import { Ciudad } from 'src/city/entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supermercado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  longitud: number;

  @Column('decimal')
  latitud: number;

  @Column()
  paginaWeb: string;

  @ManyToMany(() => Ciudad, (ciudad) => ciudad.supermercados)
  ciudades: Ciudad[];
}
