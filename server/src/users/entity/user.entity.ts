import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../roles.interface';
import Provider from './provider.entity';
import Client from './client.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  public phoneNumber: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({ default: false })
  public isRegisteredWithGoogle: boolean;

  @Column({ default: false })
  public isPhoneNumberConfirmed: boolean;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({ nullable: true })
  resetLink: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT
  })
  role: Role;

  @OneToOne(
    () => Provider, (provider) => provider.user, {
    nullable: true,
    cascade: true,
    eager: true,

  })
  @JoinColumn()
  provider?: Provider;

  @OneToOne(() => Client, (client) => client.user, {
    nullable: true,
    cascade: true,

  })
  @JoinColumn()
  client?: Client;
}
