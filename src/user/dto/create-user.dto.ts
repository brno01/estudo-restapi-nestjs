import { BaseCollection } from "src/common/base.entity";

export class CreateUserDto extends BaseCollection {

    email: string;

    name: string;
}
