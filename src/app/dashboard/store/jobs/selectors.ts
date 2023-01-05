import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardJobsState } from './interfaces';
import { dashboardJobsAdapter } from './reducers';

const getjobsState = createFeatureSelector<DashboardJobsState>('dashboardjobs');

export const dashboardJobsSelector = dashboardJobsAdapter.getSelectors();

export const getRecuiterJobsSelector = createSelector(
  getjobsState,
  dashboardJobsSelector.selectAll
);
