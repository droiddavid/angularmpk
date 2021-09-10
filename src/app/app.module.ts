import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
/*import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';*/
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';



import { AppComponent } from './app.component';
import { DashboardComponent } from './components/onboard-entry/dashboard/dashboard.component';
import { SignInComponent } from './components/onboard-entry/sign-in/sign-in.component';
import { SignUpComponent } from './components/onboard-entry/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/onboard-entry/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/onboard-entry/verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';

//import { ImageCropperModule } from 'ngx-image-cropper';
import { MpkToolbarComponent } from './globalComponents/mpk-toolbar/mpk-toolbar.component';
import { MpkFooterComponent } from './globalComponents/mpk-footer/mpk-footer.component';
import { HomePageComponent } from './components/onboard-entry/home-page/home-page.component';
import { PageNotFoundComponent } from './components/onboard-entry/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    MpkToolbarComponent,
    MpkFooterComponent,
    HomePageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    /*AngularFireAnalyticsModule,*/
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
//    ImageCropperModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
