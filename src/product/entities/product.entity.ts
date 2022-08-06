import { BaseCollection } from 'src/common/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseCollection {
    @Column({
        length: 120,
    })
    name: string;

    @Column()
    price: number;

    @Column({
        length: 255,
    })
    description: string;

    @Column({
        length: 2083,
    })
    link: string;
}
