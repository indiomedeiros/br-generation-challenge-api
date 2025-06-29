import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './domain/entities/participant.entity';
import { TypeOrmParticipantRepository } from './infra/repositories/typeorm-participant.repository';
import { CreateParticipantUseCase } from './application/usecases/create-participant.usecase';
import { GradeCalculatorService } from './domain/services/grade-calculator.service';
import { ParticipantRepository } from './domain/repositories/participant-repository';
import { ParticipantController } from './infra/controllers/participant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [ParticipantController],
  providers: [
    CreateParticipantUseCase,
    GradeCalculatorService,
    {
      provide: ParticipantRepository,
      useClass: TypeOrmParticipantRepository,
    },
  ],
})
export class ParticipantModule {}
