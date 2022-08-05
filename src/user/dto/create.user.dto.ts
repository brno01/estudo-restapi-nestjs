import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UpdateUserDto } from './update.user.dto';

export class CreateUserDto extends UpdateUserDto {
    @IsNotEmpty({ message: 'O email é obrigatório :)' })
    @IsEmail({}, { message: 'O email informado é inválido' })
    email: string;

    @IsNotEmpty({ message: 'Me informe seu nome, por favor :)' })
    name: string;

    @IsNotEmpty({ message: 'Informe sua senha, por favor :)' })
    @IsString({ message: 'A senha deve conter letras, números e caracteres' })
    password: string;
}
