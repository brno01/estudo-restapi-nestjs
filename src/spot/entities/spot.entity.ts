import {
    IsDateString,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';
import { BaseCollection } from 'src/common/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Spot extends BaseCollection {
    @IsString()
    @Column({
        name: 'id',
        length: 2083,
    })
    id: string;

    @IsDateString()
    @Column({
        name: 'spot',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    timestamp: Date;
}
