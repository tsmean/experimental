import {Entity} from 'typeorm/decorator/entity/Entity';
import {Column, PrimaryGeneratedColumn} from 'typeorm';
d
@Entity()
export class UserPassword {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  algorithm: string;

}
