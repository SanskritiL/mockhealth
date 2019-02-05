import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
//Import can activate guard services
import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard.ts.guard";
const routes: Routes = [
   {path: '', redirectTo: '/dashboard', pathMatch: "full"},
   {path: 'sign-in', component:SignInComponent,canActivate: [SecureInnerPagesGuard]},
   {path: 'register-user', component:SignUpComponent,canActivate: [SecureInnerPagesGuard]},
   {path: 'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
   {path: 'verify-email-address', component:VerifyEmailComponent,canActivate: [SecureInnerPagesGuard]},
   {path: 'forgot-password', component:ForgotPasswordComponent,canActivate: [SecureInnerPagesGuard]},
   {path:'home', component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
