import { DashboardApplyState } from 'src/app/dashboard/store/applies/interface';
import { DashboardJobsState } from 'src/app/dashboard/store/jobs/interfaces';
import { AuthInitialState } from 'src/app/shard/store/auth/interfaces';
import { ShardJobsInitialState } from 'src/app/shard/store/jobs/interface';

export interface StoreAppTypes {
  auth: AuthInitialState;
  jobs: ShardJobsInitialState;
  recruiterJobs: DashboardJobsState;
  dashboardApplies: DashboardApplyState;
}
