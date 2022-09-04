import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserMock {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    select: false,
  })
  updateAt: string;

  @Column({ name: 'active', default: true })
  active: boolean;

  @Column({ name: 'email', length: 255 })
  email: string;

  @Column({ name: 'name', length: 120 })
  name: string;

  @Column({ name: 'password', length: 255 })
  password: string;
}
