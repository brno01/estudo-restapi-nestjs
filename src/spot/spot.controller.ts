import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SpotService } from './spot.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Spot } from './entities/spot.entity';

@Controller('spot')
export class SpotController {
  constructor(private spotService: SpotService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
      summary: 'Create a new spot',
  })
  @ApiConflictResponse({
      status: 409,
      description: 'Spot already exists within system',
  })
  @ApiOkResponse({ type: CreateSpotDto, isArray: true })
  @ApiBody({ type: CreateSpotDto })
  async create(@Body() spot: CreateSpotDto): Promise<Spot> {
      return this.spotService.createSpot(spot);
  }

  @Get()
  @ApiOperation({
      summary: 'Get all spots of database',
  })
  @ApiOkResponse({ type: Spot, isArray: true })
  async getAll(): Promise<Spot[]> {
      return await this.spotService.getAllSpots();
  }

  @Get(':id')
  @ApiOperation({
      summary: 'Find a specified spot',
  })
  @ApiOkResponse({
      status: 200,
      description: 'Spot found',
      type: Spot,
  })
  async getOne(@Param('id') id: string): Promise<Spot> {
      return this.spotService.getSpotById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
      summary: 'Update a specified spot',
  })
  @ApiBody({ type: UpdateSpotDto })
  async update(
      @Param('id') id: string,
      @Body() spot: UpdateSpotDto,
  ): Promise<Spot> {
      return this.spotService.updateSpot(id, { ...spot });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
      summary: 'Delete a specified spot',
  })
  @ApiOkResponse({
      status: 200,
      description: 'Spot deleted',
      type: Spot,
  })
  async delete(@Param('id') id: string): Promise<Spot> {
      return this.spotService.deleteSpot(id);
  }
}
