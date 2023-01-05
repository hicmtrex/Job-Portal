import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { BannerComponent } from '../components/banner/banner.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { FooterBottomComponent } from '../components/footer-bottom/footer-bottom.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { JobsDetailsComponent } from '../pages/jobs/jobs-details/jobs-details.component';
import { JobsListComponent } from '../pages/jobs/jobs-list/jobs-list.component';
import { JobCardComponent } from '../components/job-card/job-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/shard/gaurds/auth.guard';
import { FeaturesComponent } from '../components/features/features.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'authentication',
        loadChildren: () =>
          import('../pages/authentication/authentication.module').then(
            (module) => module.AuthenticationModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../pages/about/about.module').then(
            (module) => module.AboutModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('../pages/contact/contact.module').then(
            (module) => module.ContactModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../pages/user/user.module').then(
            (module) => module.UserModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'jobs',
        component: JobsListComponent,
      },
      {
        path: 'jobs/:id',
        component: JobsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    BannerComponent,
    FooterComponent,
    HomeComponent,
    FooterBottomComponent,
    JobCardComponent,
    JobsListComponent,
    JobsDetailsComponent,
    FeaturesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BsDropdownModule.forRoot(),
    TypeaheadModule,

    PaginationModule.forRoot(),
  ],
})
export class MainLayoutModule {}
