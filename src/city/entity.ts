import { Supermercado } from 'src/supermarket/entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column()
  numeroHabitantes: number;

  @ManyToMany(() => Supermercado, (supermercado) => supermercado.ciudades)
  @JoinTable()
  supermercados: Supermercado[];
}
