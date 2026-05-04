import { IsNumber, IsOptional } from 'class-validator';

export class CreateGameSessionDto {
  @IsNumber()
  playerId!: number;

  @IsNumber()
  gameId!: number;

  @IsNumber()
  @IsOptional()
  score?: number;
}