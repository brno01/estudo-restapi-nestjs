import {
    IsDateString,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateSpotDto {
    @IsNotEmpty({ message: 'Id is required' })
    id: string;

    date: Date;
}
