import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiterJobsComponent } from './recruiter-jobs/recruiter-jobs.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddJobComponent } from './add-job/add-job.component';
import { InputComponent } from '../../components/UI/input/input.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardJobsEffect } from '../../store/jobs/effects';
import { dashboardJobsReducer } from '../../store/jobs/reducers';
import { EditJobComponent } from './edit-job/edit-job.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ApplyEffects } from '../../store/applies/effects';
import { dashboardApplyReducer } from '../../store/applies/reducers';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ApplyDetailsComponent } from './applies/apply-details/apply-details.component';
import { AppliesComponent } from './applies/applies-table/applies.component';

const routes: Routes = [
  { path: 'jobs-list', component: RecruiterJobsComponent },
  { path: 'applies-list', component: AppliesComponent },
  { path: 'applies/:id', component: ApplyDetailsComponent },
];

@NgModule({
  declarations: [
    AddJobComponent,
    InputComponent,
    EditJobComponent,
    ApplyDetailsComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([DashboardJobsEffect]),
    EffectsModule.forFeature([ApplyEffects]),
    StoreModule.forFeature('dashboardjobs', dashboardJobsReducer),
    StoreModule.forFeature('dashboardapply', dashboardApplyReducer),
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [],
})
export class RecruiterModule {}
