import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsString()
    name?: string;

    @IsOptional()
    price?: string;

    @IsString()
    description?: string;

    @IsString()
    link?: string;
}
