import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from './components/onboard-entry/sign-in/sign-in.component';
import { SignUpComponent } from './components/onboard-entry/sign-up/sign-up.component';
import { DashboardComponent } from './components/onboard-entry/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/onboard-entry/forgot-password/forgot-password.component';
//import { AuthGuard } from "../../shared/guard/auth.guard";
import { VerifyEmailComponent } from './components/onboard-entry/verify-email/verify-email.component';
import { HomePageComponent } from './components/onboard-entry/home-page/home-page.component';

const routes: Routes = [

	{ path: '', component: HomePageComponent, pathMatch: 'full' },
	{ path: './components/onboard-entry/sign-in', component: SignInComponent },
	{ path: 'signup', component: SignUpComponent },
	{ path: './components/onboard-entry/dashboard', component: DashboardComponent },
	{ path: './components/onboard-entry/forgot-password', component: ForgotPasswordComponent },
	{ path: './components/onboard-entry/verify-email-address', component: VerifyEmailComponent }
];

//NOTE: Add the following object to the Routes array.
/*{ path: '**', component: NoPageFoundComponent }*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }