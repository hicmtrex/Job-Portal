import { EntityState } from '@ngrx/entity';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';

export interface DashboardJobsState extends EntityState<JobTypes> {
  loading: boolean;
  error: string | null;
}
