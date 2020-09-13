import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestGuard } from './core/guards/guest.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

import { ContentComponent } from './shared/layout/content/content.component';
import { LoginComponent } from './modules/sessions/pages/login/login.component';
import { LogoutComponent } from './modules/sessions/pages/logout/logout.component';
import { RegisterComponent } from './modules/sessions/pages/register/register.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { NewTransactionComponent } from './modules/transactions/pages/new-transaction/new-transaction.component';


const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    canLoad: [AuthenticatedGuard], canActivate: [AuthenticatedGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'transactions/buy', component: NewTransactionComponent, data: { title: 'New Investment' } },
    ]
  },

  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
    canLoad: [GuestGuard], canActivate: [GuestGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
    canLoad: [GuestGuard], canActivate: [GuestGuard],
  },

  {
    path: 'logout',
    component: LogoutComponent,
    canLoad: [AuthenticatedGuard], canActivate: [AuthenticatedGuard],
  },

  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
