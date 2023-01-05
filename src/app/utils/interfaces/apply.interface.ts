import { JobTypes } from './jobs.interface';
import { UserInfoTypes } from './user.interface';

export interface ApplyType {
  id: string;
  letter: string;
  resume: string;
  status: string;
  userId: string;
  user: UserInfoTypes;
  job: JobTypes;
  createdAt: Date;
  updatedAt: Date;
}
