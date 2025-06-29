import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './domain/entities/participant.entity';
import { TypeOrmParticipantRepository } from './infra/orm/typeorm-participant.repository';
import { CreateParticipantUseCase } from './application/usecases/create-participant.usecase';
import { GradeCalculatorService } from './domain/services/grade-calculator.service';
import { ParticipantRepository } from './domain/repositories/participant-repository';
import { ParticipantController } from './presentation/controllers/participant.controller';
import { FindAllParticipantsUseCase } from './application/usecases/find-all-participants.usecase';
import { FindByIdUseCase } from './application/usecases/find-by-id-participant.usecase';
import { RemoveParticipantUseCase } from './application/usecases/remove-participant.usecase';
import { UpdateParticipantUseCase } from './application/usecases/update-participant.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [ParticipantController],
  providers: [
    CreateParticipantUseCase,
    GradeCalculatorService,
    FindAllParticipantsUseCase,
    FindByIdUseCase,
    UpdateParticipantUseCase,
    RemoveParticipantUseCase,
    {
      provide: ParticipantRepository,
      useClass: TypeOrmParticipantRepository,
    },
  ],
})
export class ParticipantModule {}
