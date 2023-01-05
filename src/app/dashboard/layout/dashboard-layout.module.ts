import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { TopnavComponent } from '../components/topnav/topnav.component';
import { JobsTableComponent } from '../pages/admin/jobs-table/jobs-table.component';
import { TableContainerComponent } from '../components/containers/table-container/table-container.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UsersTableComponent } from '../pages/admin/users-table/users-table.component';
import { RecruiterJobsComponent } from '../pages/recruiter/recruiter-jobs/recruiter-jobs.component';
import { AppliesComponent } from '../pages/recruiter/applies/applies-table/applies.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'recruiter',
        loadChildren: () =>
          import('../pages/recruiter/recruiter.module').then(
            (m) => m.RecruiterModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SidebarComponent,
    TableContainerComponent,
    TopnavComponent,
    JobsTableComponent,
    UsersTableComponent,
    RecruiterJobsComponent,
    AppliesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),

    PaginationModule.forRoot(),
  ],
  exports: [TableContainerComponent],
})
export class DashboardLayoutModule {}
