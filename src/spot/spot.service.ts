import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { Spot } from './entities/spot.entity';

@Injectable()
export class SpotService {
  constructor(
      @InjectRepository(Spot)
      private readonly spotRepository: Repository<Spot>,
  ) { }

  async getAllSpots(): Promise<Spot[]> {
      const spots = await this.spotRepository.find();
      if (!spots) {
          throw new InternalServerErrorException(
              'Não foi possível buscar todos os pontos',
          );
      }
      return spots;
  }

  async getSpotById(id: string): Promise<Spot> {
      const checkSpot = await this.spotRepository.findOne({
          where: { id },
      });
      if (!checkSpot) {
          throw new NotFoundException('Produto não encontrado no sistema');
      }
      return checkSpot;
  }

  async createSpot(spot: CreateSpotDto
  ): Promise<Spot> {
      const checkSpot = await this.spotRepository.findOne({
          where: { id: spot.id },
      });
      if (checkSpot) {
          throw new ConflictException('Ponto já batido no sistema');
      }
      const spotSaved = this.spotRepository
          .create({ ...spot })
          .save();
  
      if (!spotSaved) {
          throw new InternalServerErrorException(
              'Não foi possível criar produto',
          );
      }
      return spotSaved;
  }

  async updateSpot(
      id: string,
      spot: UpdateSpotDto,
  ): Promise<Spot> {
      const checkSpot = await this.spotRepository.findOne({
          where: { id },
      });
      if (!checkSpot) {
          throw new NotFoundException('Batida de ponto não encontrada no sistema');
      }
      const spotUpdated = this.spotRepository
          .create({
              id,
              ...spot,
          })
          .save();

      if (!spotUpdated) {
          throw new InternalServerErrorException(
              'Não foi possível atualizar o ponto batido',
          );
      }
      const spotSaved = await this.spotRepository.findOne({
          where: { id },
      });
      return spotSaved;
  }

  async deleteSpot(id: string): Promise<Spot> {
      const checkSpot = await this.spotRepository.findOne({
          where: { id },
      });
      if (!checkSpot) {
          throw new NotFoundException('Batida de ponto não encontrada no sistema');
      }
      const spotDeleted = await this.spotRepository.delete({
          id,
      });
      if (!spotDeleted) {
          throw new InternalServerErrorException(
              'Não foi possível deletar produto',
          );
      }
      if (spotDeleted) {
          throw new NotFoundException(
              'Ponto batido removido do sistema com sucesso',
          );
      }
      return checkSpot;
  }
}
