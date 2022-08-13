import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';

export class CreateProductDto {

    @IsNotEmpty({ message: 'Product name is required' })
    name: string;

    @IsNumberString({ message: 'Product price, please :)' })
    @IsNotEmpty({ message: 'Product price is required' })
    price: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsUrl({ message: 'Product link is not a valid url' })
    @IsOptional()
    link: string;

}