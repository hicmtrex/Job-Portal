import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';

export const GetRecuirerJobs = createAction(
  '[RecuirerJobs] GetRecuirerJobs Fetching'
);
export const GetRecuirerJobsSuccess = createAction(
  '[RecuirerJobs] GetRecuirerJobs Success',
  props<{ jobs: JobTypes[] }>()
);

export const AddNewJob = createAction(
  '[AddNewJob] AddNewJob Staer',
  props<{ job: any }>()
);
export const AddNewJobSuccess = createAction(
  '[AddNewJob] AddNewJob Success',
  props<{ job: any }>()
);

export const UpdateJob = createAction(
  '[UpdateJob] UpdateJob Start',
  props<{ job: JobTypes }>()
);
export const UpdateJobSuccess = createAction(
  '[UpdateJob] UpdateJob Success',
  props<{ job: Update<JobTypes> }>()
);
