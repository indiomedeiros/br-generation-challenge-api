import { Body, Controller, Post } from '@nestjs/common';
import { Participant } from '../../domain/entities/participant.entity';
import { CreateParticipantDto } from 'src/participant/application/dto/create-participant.dto';
import { CreateParticipantUseCase } from 'src/participant/application/usecases/create-participant.usecase';

@Controller('participant')
export class ParticipantController {
  constructor(
    private readonly createParticipantUseCase: CreateParticipantUseCase,
  ) {}

  @Post()
  async create(
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return await this.createParticipantUseCase.execute(createParticipantDto);
  }
}
