import { Participant } from '../../domain/entities/participant.entity';
import { UpdateParticipantDto } from '../dto/update-participant.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantRepository } from '../../domain/repositories/participant-repository';

@Injectable()
export class UpdateParticipantUseCase {
  constructor(private readonly participantRepository: ParticipantRepository) {}

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

    return await this.participantRepository.save(updatedParticipant);
  }
}
