import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Participant } from '../../domain/entities/participant.entity';
import { CreateParticipantDto } from 'src/participant/application/dto/create-participant.dto';
import { CreateParticipantUseCase } from 'src/participant/application/usecases/create-participant.usecase';
import { FindAllParticipantsUseCase } from 'src/participant/application/usecases/find-all-participants.usecase';
import { FindByIdUseCase } from 'src/participant/application/usecases/find-by-id-participant.usecase';
import { RemoveParticipantUseCase } from 'src/participant/application/usecases/remove-participant.usecase';

@Controller('participant')
export class ParticipantController {
  constructor(
    private readonly createParticipantUseCase: CreateParticipantUseCase,
    private readonly findAllParticipantsUseCase: FindAllParticipantsUseCase,
    private readonly findByIdParticipantUseCase: FindByIdUseCase,
    private readonly removeParticipantUseCase: RemoveParticipantUseCase,
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

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Participant> {
    return await this.findByIdParticipantUseCase.execute(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.removeParticipantUseCase.execute(id);
  }
}
