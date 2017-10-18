import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity()
export class UserPassword {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  algorithm: string;

}


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 35 })
  firstName: string;

  @Column({ length: 35 })
  lastName: string;

  @Column({ length: 50})
  mail: string;

  @OneToOne(type => UserPassword)
  @JoinColumn()
  password: UserPassword;

}
