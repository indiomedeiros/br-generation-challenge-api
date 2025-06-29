import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participant/domain/entities/participant.entity';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [Participant],
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    }),
    ParticipantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
