import { createAction, props } from '@ngrx/store';
import { ApplyType } from 'src/app/utils/interfaces/apply.interface';

export const DashboardApply = createAction(
  '[DashboardApply] DashboardApply Fetching',
  props<{
    page: number;
  }>()
);
export const DashboardApplySuccess = createAction(
  '[DashboardApply] DashboardApply Success',
  props<{
    applies: ApplyType[];
    pages: number;
    page: number;
    appliesCount: number;
  }>()
);
