import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly fullName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  @Max(30)
  readonly age: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  readonly firstSemesterGrade: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  readonly secondSemesterGrade: number;
}
