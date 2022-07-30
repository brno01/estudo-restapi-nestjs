import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: "O email é obrigatório" })
    @IsEmail({}, { message: "O email informado é inválido" })
    @MinLength(8)
    email: string;

    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MinLength(8)
    name: string;
}
