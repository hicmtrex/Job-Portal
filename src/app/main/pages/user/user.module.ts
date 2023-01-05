import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ApplyHistoryComponent } from './apply-history/apply-history.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateProfileComponent,
    ProfileInfoComponent,
    ApplyHistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TabsModule.forRoot(),
    PaginationModule,
  ],
})
export class UserModule {}
