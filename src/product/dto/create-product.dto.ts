import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'Product name is required' })
    name: string;

    @IsNotEmpty({ message: 'Product price is required' })
    @IsNumber({}, { message: 'Product price must be a number' })
    price: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsUrl({ message: 'Product link is not a valid url' })
    @IsOptional()
    link: string;
}
