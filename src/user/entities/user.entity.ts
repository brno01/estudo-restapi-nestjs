import { BaseCollection } from 'src/common/shared/base.entity';
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

    @Column({
        length: 255,
    })
    password: string;
}
