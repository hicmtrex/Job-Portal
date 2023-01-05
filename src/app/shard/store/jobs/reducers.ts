import { createReducer, on } from '@ngrx/store';
import { GetFiltredJobsPending, GetFiltredJobsSuccess } from './actions';
import { ShardJobsInitialState } from './interface';

export const initialState: ShardJobsInitialState = {
  error: null,
  isLoading: false,
  job: null,
  jobs: [],
};

export const shardJobsReducer = createReducer(
  initialState,
  //register
  //logout
  on(GetFiltredJobsPending, (state) => ({ ...state, isLoading: true })),
  on(GetFiltredJobsSuccess, (state, action) => ({
    ...state,
    isLoading: true,
    jobs: action.jobs,
  }))
);
