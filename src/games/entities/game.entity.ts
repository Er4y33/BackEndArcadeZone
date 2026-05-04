import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { GameSession } from '../../game-sessions/entities/game-session.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column()
  genre!: string;

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0 })
  price!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  releasedAt!: Date;

  // OneToMany: Bir oyunun BİRDEN FAZLA oynanma oturumu olabilir.
  @OneToMany(() => GameSession, session => session.game)
  sessions!: GameSession[];
}