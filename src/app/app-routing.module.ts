import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
   {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
   {path: 'sign-in', component:SignInComponent},
   {path: 'register-user', component:SignUpComponent},
   {path: 'dashboard', component:DashboardComponent},
   {path: 'verify-email-address', component:VerifyEmailComponent},
   {path: 'forgot-password', component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
