import { Participant } from '../../domain/entities/participant.entity';
import { UpdateParticipantDto } from '../dto/update-participant.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantRepository } from '../../domain/repositories/participant-repository';
import { GradeCalculatorService } from '../../domain/services/grade-calculator.service';

@Injectable()
export class UpdateParticipantUseCase {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly gradeCalculatorService: GradeCalculatorService,
  ) {}

  async execute(
    id: string,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    const existingParticipant = await this.participantRepository.findById(id);

    if (!existingParticipant)
      throw new NotFoundException('Participant not found');

    const updatedParticipant: Participant = this.participantRepository.merge(
      existingParticipant,
      updateParticipantDto,
    );

    if (
      updateParticipantDto.firstSemesterGrade !== undefined ||
      updateParticipantDto.secondSemesterGrade !== undefined
    ) {
      const firstGrade: number =
        updateParticipantDto.firstSemesterGrade ??
        existingParticipant.firstSemesterGrade;

      const secondGrade: number =
        updateParticipantDto.secondSemesterGrade ??
        existingParticipant.secondSemesterGrade;

      const updatedFinalMedia: number =
        this.gradeCalculatorService.calculateAverage(firstGrade, secondGrade);

      updatedParticipant.finalAverage = updatedFinalMedia;
    }

    return await this.participantRepository.save(updatedParticipant);
  }
}
