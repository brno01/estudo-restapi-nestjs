import { BaseCollection } from 'src/common/base.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseCollection {
	@PrimaryColumn({ length: 255, unique: true, nullable: false })
	email: string;

	@Column({ length: 120, nullable: false })
	name: string;
}
