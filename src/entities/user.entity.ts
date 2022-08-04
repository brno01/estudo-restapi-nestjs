import { BaseCollection } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseCollection {
    @Column({
        length: 255,
    })
    email: string;

    @Column({
        length: 120,
    })
    name: string;
}
