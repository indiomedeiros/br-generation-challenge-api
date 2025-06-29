import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantRepository } from '../../domain/repositories/participant-repository';

@Injectable()
export class RemoveParticipantUseCase {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async execute(id: string): Promise<void> {
    const existingParticipant = await this.participantRepository.findById(id);

    if (!existingParticipant)
      throw new NotFoundException('Participant not found');

    await this.participantRepository.remove(existingParticipant);
  }
}
