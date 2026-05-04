import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { GameSession } from '../../game-sessions/entities/game-session.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  email!: string;

  @Column({ default: 0 })
  level!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance!: number;

  @CreateDateColumn()
  createdAt!: Date;

  // OneToMany: Bir oyuncunun BİRDEN FAZLA oturumu olabilir.
  @OneToMany(() => GameSession, session => session.player)
  sessions!: GameSession[];
}