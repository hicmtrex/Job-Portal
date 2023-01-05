import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { JobsTableComponent } from './jobs-table/jobs-table.component';
import { UsersTableComponent } from './users-table/users-table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jobs-list', component: JobsTableComponent },
  { path: 'users-list', component: UsersTableComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
