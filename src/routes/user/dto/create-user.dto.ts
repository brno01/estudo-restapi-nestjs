import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends UpdateUserDto {
	email: string;

	name: string;
}
