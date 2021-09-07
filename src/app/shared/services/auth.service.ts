import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
//import { auth } from 'firebase/app/';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';

//import { getAuth } from "firebase/auth";

//const auth = getAuth();
//firebase.auth().useDeviceLanguage();


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  userData!: Observable<firebase.User>; // Save logged in user data
  _user: any = {}; //localstorage user data


  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public angularFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) { 
    //this.userData = angularFireAuth.authState;
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe(async user => {
      if (user) {
        //this.userData = user;
        console.log("user.email: " + user.email);
        console.log("user.providerData[0]?.displayName: " + user.providerData[0]?.displayName);
        console.log("user.providerData[0]?.email: " + user.providerData[0]?.email);
        console.log("user.providerData[0]?.phoneNumber: " + user.providerData[0]?.phoneNumber);
        console.log("user.providerData[0]?.photoURL: " + user.providerData[0]?.photoURL);
        console.log("user.providerData[0]?.providerId: " + user.providerData[0]?.providerId);
        console.log("user.providerData[0]?.uid: " + user.providerData[0]?.uid);

        // console.log('afAuth.currentUser: ' + afAuth.currentUser);
        // console.table([afAuth.currentUser]);

        localStorage.setItem('user', JSON.stringify(user.providerData[0]));

        this._user = localStorage.getItem('user');

        // if (this._user) {console.log("this._user: " + this._user);}
        // console.log("this._user should equal: " + this._user);
      } else {
        localStorage.setItem('user', JSON.stringify({}));
        if (this._user) {console.log(JSON.parse(JSON.stringify(localStorage.getItem('user'))));}
      }
    })
  }


  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }


  /* Sign up */
  async SignUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }
  
  
  /* Sign out */
  async SignOut() {
    this.angularFireAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['./components/sign-in']);
        //this.router.navigate(['app-sign-in']);
      });
  }
  
  
  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return this.afAuth.currentUser
      .then((user) => {
        user?.sendEmailVerification()
        .then(() => {
          this.router.navigate(['verify-email-address']);
        })
    })
  }


  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }


  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    this._user = JSON.parse(JSON.stringify(localStorage.getItem('user')));
    const user = this._user;
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  // Sign in with Google
  /*GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }*/


  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })

      //this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}