import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Eklendi
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player } from './entities/player.entity'; // Eklendi

@Module({
  imports: [TypeOrmModule.forFeature([Player])], // Eklendi
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService], // Eklendi (İleride lazım olacak)
})
export class PlayersModule {}