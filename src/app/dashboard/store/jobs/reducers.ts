import { createReducer, on } from '@ngrx/store';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';
import {
  AddNewJob,
  AddNewJobSuccess,
  GetRecuirerJobs,
  GetRecuirerJobsSuccess,
  UpdateJob,
  UpdateJobSuccess,
} from './actions';
import { createEntityAdapter } from '@ngrx/entity';
import { DashboardJobsState } from './interfaces';

export const dashboardJobsAdapter = createEntityAdapter<JobTypes>();

const initialState: DashboardJobsState = dashboardJobsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const dashboardJobsReducer = createReducer(
  initialState,
  on(GetRecuirerJobs, (state) => ({ ...state, loading: true })),
  on(GetRecuirerJobsSuccess, (state, action) => {
    return dashboardJobsAdapter.setAll(action.jobs, {
      ...state,
      loading: true,
    });
  }),
  on(AddNewJob, (state) => ({ ...state, loading: true })),
  on(AddNewJobSuccess, (state, action) => {
    return dashboardJobsAdapter.addOne(action.job, {
      ...state,
      loading: false,
    });
  }),
  on(UpdateJob, (state) => ({ ...state, loading: true })),
  on(UpdateJobSuccess, (state, action) => {
    return dashboardJobsAdapter.updateOne(action.job, {
      ...state,
      loading: false,
    });
  })
);
