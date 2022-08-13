import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { BaseCollection } from 'src/common/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseCollection {

    @IsNotEmpty({ message: 'Product name is required' })
    @IsString()
    @Column({
        name: 'name',
        length: 120,
    })
    name: string;

    @IsNotEmpty({ message: 'Product price, please :)' })
    @IsNumberString()
    @Column({
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

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
