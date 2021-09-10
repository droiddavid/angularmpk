import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;


  constructor(public authenticationService: AuthService) {
    //this.profiles = firestore.collection('profiles').valueChanges();
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }


  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }


  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }


  signOut() {
    this.authenticationService.SignOut();
  }

}
