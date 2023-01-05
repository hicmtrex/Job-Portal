import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';

export interface ShardJobsInitialState {
  isLoading: boolean;
  error: string | null;
  jobs: JobTypes[];
  job: JobTypes | null;
}
