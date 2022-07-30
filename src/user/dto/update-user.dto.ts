import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateUserDto {

    @IsNotEmpty({ message: "O email é obrigatório" })
    @IsEmail({}, { message: "O email informado é inválido" })
    @IsOptional()
    email?: string;

    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @IsOptional()
    name?: string;
}
