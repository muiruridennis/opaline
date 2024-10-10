import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Provider from './provider.entity';

@Entity()
export default class Certification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({nullable:true})
  issuingOrganization: string;

  @Column({ type: 'date', nullable: true })
  dateIssued: Date;

  @ManyToOne(() => Provider, (provider) => provider.certifications, { onDelete: 'CASCADE' })
  provider: Provider;
}
