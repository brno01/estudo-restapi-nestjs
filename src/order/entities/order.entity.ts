import { BaseCollection } from "src/common/shared/base.entity";
import { Column } from "typeorm";

export class Order extends BaseCollection {
    @Column({ name: 'productId' })
    product: string;

    @Column()
    quantity: number;

    @Column()
    price: number;
}
