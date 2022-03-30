import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/user-registration', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
