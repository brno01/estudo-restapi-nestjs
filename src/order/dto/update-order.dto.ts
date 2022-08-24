import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsString({ message: "Product must be a string" })
    @IsOptional()
    product?: string;

    @IsNumber({ maxDecimalPlaces: 0 })
    @IsOptional()
    quantity?: number;

    @IsNumber({ maxDecimalPlaces: 3 })
    @IsOptional()
    price?: number;
}
