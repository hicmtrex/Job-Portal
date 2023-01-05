import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './shard/gaurds/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./main/layout/main-layout.module').then(
        (module) => module.MainLayoutModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/layout/dashboard-layout.module').then(
        (module) => module.DashboardLayoutModule
      ),
    canActivate: [DashboardGuard],
  },

  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
