import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';
import { ShardJobsInitialState } from './interface';

export const selectJobs = (state: StoreAppTypes) => state.jobs;

export const jobsSelectors = createSelector(selectJobs, (state) => state.jobs);
export const jobsLoading = createSelector(
  selectJobs,
  (state) => state.isLoading
);
