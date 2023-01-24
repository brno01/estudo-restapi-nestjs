import { PartialType } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
import { CreateSpotDto } from './create-spot.dto';

export class UpdateSpotDto extends PartialType(CreateSpotDto) {
    @IsDateString()
    date?: Date;
}
