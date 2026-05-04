import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { GameSession } from './entities/game-session.entity';

@Injectable()
export class GameSessionsService {
  constructor(
    @InjectRepository(GameSession)
    private gameSessionsRepository: Repository<GameSession>,
  ) {}

  // CREATE - İlişkileri ID üzerinden kurarak oturum başlat
  async create(dto: CreateGameSessionDto): Promise<GameSession> {
    const session = this.gameSessionsRepository.create({
      player: { id: dto.playerId }, // Gelen ID'yi player ilişkisine bağla
      game: { id: dto.gameId },     // Gelen ID'yi game ilişkisine bağla
      score: dto.score || 0
    });
    return this.gameSessionsRepository.save(session);
  }

  // READ - İlişkili tablolarla (player ve game) birlikte getir
  async findAll(): Promise<GameSession[]> {
    return this.gameSessionsRepository.find({
      relations: ['player', 'game'], // Oyuncu ve Oyun detaylarını da SQL'den çek!
    });
  }

  async findOne(id: number): Promise<GameSession> {
    const session = await this.gameSessionsRepository.findOne({
      where: { id },
      relations: ['player', 'game'],
    });
    if (!session) throw new NotFoundException(`Oturum ${id} bulunamadı`);
    return session;
  }

  async update(id: number, updateDto: Partial<CreateGameSessionDto>): Promise<GameSession> {
    if (updateDto.score !== undefined) {
      await this.gameSessionsRepository.update(id, { score: updateDto.score });
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.gameSessionsRepository.delete(id);
  }
}