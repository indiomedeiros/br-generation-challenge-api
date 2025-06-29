import { Injectable } from '@nestjs/common';

@Injectable()
export class GradeCalculatorService {
  calculateAverage(firstGrade: number, secondGrade: number) {
    const newAverage = (firstGrade + secondGrade) / 2;
    return newAverage;
  }
}
