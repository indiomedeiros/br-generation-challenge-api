import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './domain/entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [],
  providers: [],
})
export class ParticipantModule {}
