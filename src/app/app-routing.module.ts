import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@pages/login/login.component';
import { SignupComponent } from '@pages/signup/signup.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { AuthGuard } from '@shared/guards';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    canActivate: [AuthGuard()],
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    title: 'Signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    title: 'Profile',
    canActivate: [AuthGuard()],
    component: ProfileComponent,
  },
  {
    path: '**',
    redirectTo: '',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
