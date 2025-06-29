import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  fullName: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'float', nullable: false })
  firstSemesterGrade: number;

  @Column({ type: 'float', nullable: false })
  secondSemesterGrade: number;

  @Column({ type: 'float', nullable: false })
  finalAverage: number;
}
