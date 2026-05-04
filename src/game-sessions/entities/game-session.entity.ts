import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Game } from '../../games/entities/game.entity';

@Entity('game_sessions')
export class GameSession {
  @PrimaryGeneratedColumn()
  id!: number;

  // ManyToOne: Birçok oturum, BİR oyuncuya ait olabilir.
  @ManyToOne(() => Player, player => player.sessions)
  player!: Player;

  // ManyToOne: Birçok oturum, BİR oyuna ait olabilir.
  @ManyToOne(() => Game, game => game.sessions)
  game!: Game;

  @Column({ type: 'int', default: 0 })
  score!: number;

  @CreateDateColumn()
  startedAt!: Date;

  @Column({ nullable: true })
  endedAt?: Date;
}