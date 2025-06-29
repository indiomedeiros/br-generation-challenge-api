import { Body, Controller, Get, Post } from '@nestjs/common';
import { Participant } from '../../domain/entities/participant.entity';
import { CreateParticipantDto } from 'src/participant/application/dto/create-participant.dto';
import { CreateParticipantUseCase } from 'src/participant/application/usecases/create-participant.usecase';
import { FindAllParticipantsUseCase } from 'src/participant/application/usecases/find-all-participants.usecase';

@Controller('participant')
export class ParticipantController {
  constructor(
    private readonly createParticipantUseCase: CreateParticipantUseCase,
    private readonly findAllParticipantsUseCase: FindAllParticipantsUseCase,
  ) {}

  @Post()
  async create(
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    return await this.createParticipantUseCase.execute(createParticipantDto);
  }

  @Get()
  async findAll(): Promise<Participant[]> {
    return await this.findAllParticipantsUseCase.execute();
  }
}
