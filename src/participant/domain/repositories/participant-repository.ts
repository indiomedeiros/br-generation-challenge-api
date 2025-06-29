import { Participant } from '../entities/participant.entity';

export abstract class ParticipantRepository {
  abstract save(participant: Participant): Promise<Participant>;
  abstract findAll(): Promise<Participant[]>;
  abstract findById(id: string): Promise<Participant | null>;
  abstract remove(participant: Participant): Promise<void>;
  abstract merge(
    participant: Participant,
    update: Partial<Participant>,
  ): Participant;
}
