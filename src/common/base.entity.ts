import {
	BaseEntity,
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export abstract class BaseCollection extends BaseEntity {
	@PrimaryGeneratedColumn('uuid', { name: 'id' })
	id: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	createdAt: string;

	@UpdateDateColumn({
		type: 'timestamp',
		select: false,
	})
	updateAt: string;

	@Column({ type: 'bool', name: 'active', default: true })
	active: boolean;
}
