import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ApplyType } from 'src/app/utils/interfaces/apply.interface';
import { DashboardApply, DashboardApplySuccess } from './actions';
import { DashboardApplyState } from './interface';

export const dashboardApplyAdapter = createEntityAdapter<ApplyType>();

const initialState: DashboardApplyState = dashboardApplyAdapter.getInitialState(
  {
    loading: false,
    appliesCount: 20,
    error: null,
    page: 1,
    pages: 1,
  }
);

export const dashboardApplyReducer = createReducer(
  initialState,
  on(DashboardApply, (state) => ({ ...state, loading: true })),
  on(DashboardApplySuccess, (state, action) => {
    return dashboardApplyAdapter.setAll(action.applies, {
      ...state,
      loading: false,
      page: action.page,
      pages: action.pages,
      appliesCount: action.appliesCount,
    });
  })
);
