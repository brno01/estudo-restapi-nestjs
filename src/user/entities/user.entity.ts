import { BaseCollection } from "src/common/base.entity";
import { Column } from "typeorm";

export class User extends BaseCollection {

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

}
