import { createAction, props } from '@ngrx/store';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';

//register
export const GetFiltredJobsPending = createAction(
  '[Jobs] GetFiltredJobs Pending'
  // props<{ filter: { category: string; page: number; search: string } }>()
);

export const GetFiltredJobsSuccess = createAction(
  '[Jobs] GetFiltredJobs Success',
  props<{ jobs: JobTypes[] }>()
);
export const GetFiltredJobsFailure = createAction(
  '[Jobs] GetFiltredJobs Failure',
  props<{ error: string }>()
);
