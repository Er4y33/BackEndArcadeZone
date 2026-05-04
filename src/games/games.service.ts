import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gamesRepository.create(createGameDto);
    return this.gamesRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gamesRepository.findOneBy({ id });
    if (!game) {
      throw new NotFoundException(`Oyun ${id} bulunamadı`);
    }
    return game;
  }

  async update(id: number, updateDto: Partial<CreateGameDto>): Promise<Game> {
    await this.gamesRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.gamesRepository.delete(id);
  }
}