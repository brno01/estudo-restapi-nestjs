import { IsEmail, IsNotEmpty } from 'class-validator';
import { UpdateUserDto } from './update.user.dto';

export class CreateUserDto extends UpdateUserDto {
    @IsNotEmpty({ message: 'O email é obrigatório :)' })
    @IsEmail({}, { message: 'O email informado é inválido' })
    email: string;

    @IsNotEmpty({ message: 'Me informe seu nome, por favor :)' })
    name: string;
}
