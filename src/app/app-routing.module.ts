import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
//import { AuthGuard } from "../../shared/guard/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: './app', pathMatch: 'full' },
  { path: './components/sign-in', component: SignInComponent },
  { path: './components/register-user', component: SignUpComponent },
  { path: './components/dashboard', component: DashboardComponent },
  { path: './components/forgot-password', component: ForgotPasswordComponent },
  { path: './components/verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
