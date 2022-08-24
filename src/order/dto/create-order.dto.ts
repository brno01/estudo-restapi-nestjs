import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString({ message: "Product must be a string" })
    product: string;

    @IsNumber()
    quantity: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;
}
