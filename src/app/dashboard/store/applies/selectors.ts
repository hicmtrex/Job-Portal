import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';
import { DashboardApplyState } from './interface';
import { dashboardApplyAdapter } from './reducers';

const getApplyState =
  createFeatureSelector<DashboardApplyState>('dashboardapply');

export const selectFeature = (state: StoreAppTypes) => state.dashboardApplies;

export const dashboardJobsSelector = dashboardApplyAdapter.getSelectors();

export const getDashboardApplySelector = createSelector(
  getApplyState,
  dashboardJobsSelector.selectAll
);

export const pagesSelector = createSelector(
  getApplyState,
  (state) => state.pages
);
