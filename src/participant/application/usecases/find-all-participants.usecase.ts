import { Participant } from '../../domain/entities/participant.entity';
import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from '../../domain/repositories/participant-repository';

@Injectable()
export class FindAllParticipantsUseCase {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async execute(): Promise<Participant[]> {
    return await this.participantRepository.findAll();
  }
}
