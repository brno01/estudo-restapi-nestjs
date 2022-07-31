import { BaseCollection } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseCollection {
	@Column({ length: 255, unique: true, primary: true, nullable: false })
	email: string;

	@Column({ length: 120, nullable: false })
	name: string;
}
