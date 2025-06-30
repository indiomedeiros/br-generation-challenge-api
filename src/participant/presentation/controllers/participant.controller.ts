import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Participant } from '../../domain/entities/participant.entity';
import { CreateParticipantDto } from 'src/participant/application/dto/create-participant.dto';
import { CreateParticipantUseCase } from 'src/participant/application/usecases/create-participant.usecase';
import { FindAllParticipantsUseCase } from 'src/participant/application/usecases/find-all-participants.usecase';
import { FindByIdUseCase } from 'src/participant/application/usecases/find-by-id-participant.usecase';
import { RemoveParticipantUseCase } from 'src/participant/application/usecases/remove-participant.usecase';
import { UpdateParticipantUseCase } from 'src/participant/application/usecases/update-participant.usecase';
import { UpdateParticipantDto } from 'src/participant/application/dto/update-participant.dto';
import { HateoasInterceptor } from '../interceptors/hateoas.interceptor';

@Controller('participant')
@UseInterceptors(HateoasInterceptor)
export class ParticipantController {
  constructor(
    private readonly createParticipantUseCase: CreateParticipantUseCase,
    private readonly findAllParticipantsUseCase: FindAllParticipantsUseCase,
    private readonly findByIdParticipantUseCase: FindByIdUseCase,
    private readonly removeParticipantUseCase: RemoveParticipantUseCase,
    private readonly updateParticipantUseCase: UpdateParticipantUseCase,
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return await this.updateParticipantUseCase.execute(
      id,
      updateParticipantDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.removeParticipantUseCase.execute(id);
  }
}
