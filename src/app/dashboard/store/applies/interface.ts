import { EntityState } from '@ngrx/entity';
import { ApplyType } from 'src/app/utils/interfaces/apply.interface';

export interface DashboardApplyState extends EntityState<ApplyType> {
  loading: boolean;
  error: string | null;
  page: number;
  appliesCount: number;
  pages: number;
}
