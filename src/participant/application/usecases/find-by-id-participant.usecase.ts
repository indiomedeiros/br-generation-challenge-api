import { Participant } from '../../domain/entities/participant.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantRepository } from '../../domain/repositories/participant-repository';

@Injectable()
export class FindByIdUseCase {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async execute(id: string): Promise<Participant> {
    const existingParticipant = await this.participantRepository.findById(id);

    if (!existingParticipant)
      throw new NotFoundException('Participant not found');

    return existingParticipant;
  }
}
