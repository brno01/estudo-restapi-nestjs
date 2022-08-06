import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { BaseCollection } from 'src/common/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseCollection {

    @IsString()
    @Column({
        name: 'name',
        length: 120,
    })
    name: string;

    @IsNumberString()
    @Column({
        name: 'price',
    })
    price: string;

    @IsString()
    @IsOptional()
    @Column({
        name: 'description',
        length: 255,
    })
    description: string;

    @IsString()
    @IsOptional()
    @Column({
        name: 'url',
        length: 2083,
    })
    link: string;

}
