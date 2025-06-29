import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../../domain/entities/participant.entity';
import { Repository } from 'typeorm';
import { ParticipantRepository } from '../../domain/repositories/participant-repository';

@Injectable()
export class TypeOrmParticipantRepository extends ParticipantRepository {
  constructor(
    @InjectRepository(Participant)
    private readonly ormRepository: Repository<Participant>,
  ) {
    super();
  }

  async save(participant: Participant): Promise<Participant> {
    return await this.ormRepository.save(participant);
  }

  async findAll(): Promise<Participant[]> {
    return await this.ormRepository.find();
  }

  async findById(id: string): Promise<Participant | null> {
    return await this.ormRepository.findOne({ where: { id } });
  }

  async remove(participant: Participant): Promise<void> {
    await this.ormRepository.remove(participant);
  }

  merge(participant: Participant, update: Partial<Participant>): Participant {
    return this.ormRepository.merge(participant, update);
  }
}
