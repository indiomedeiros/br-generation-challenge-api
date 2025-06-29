import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from 'src/participant/domain/repositories/participant-repository';
import { GradeCalculatorService } from 'src/participant/domain/services/grade-calculator.service';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { Participant } from 'src/participant/domain/entities/participant.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreateParticipantUseCase {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly gradeCalculatorService: GradeCalculatorService,
  ) {}

  async execute(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    const finalAverage = this.gradeCalculatorService.calculateAverage(
      createParticipantDto.firstSemesterGrade,
      createParticipantDto.secondSemesterGrade,
    );

    const newParticipant: Participant = {
      id: randomUUID(),
      ...createParticipantDto,
      finalAverage,
    };

    return await this.participantRepository.save(newParticipant);
  }
}
