import { ApplicationStatus } from '../application-status-enum';
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
@Injectable()
export class ApplicationStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ApplicationStatus.PENDING,
    ApplicationStatus.REJECTED,
    ApplicationStatus.ASSIGNMENT,
    ApplicationStatus.INTERVIEW,
    ApplicationStatus.SUCCEEDED,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
