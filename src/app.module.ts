import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module';
import { GamesModule } from './games/games.module';
import { GameSessionsModule } from './game-sessions/game-sessions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'oyun_admin',
      password: 'sifre123',
      database: 'oyun_veritabani',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // Geliştirme ortamında: Entity'den tablo oluştur
    }),
    PlayersModule,
    GamesModule,
    GameSessionsModule, // Bu çok önemli, silinmemeli
  ],
})
export class AppModule {}