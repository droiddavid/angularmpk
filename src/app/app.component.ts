import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

//import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

	//Image Cropper Properties and Events.
	// imgChangeEvt: any = '';
	// cropImgPreview: any = '';
	// onFileChange(event: any): void { this.imgChangeEvt = event; }
	// cropImg(e: ImageCroppedEvent) { this.cropImgPreview = e.base64; } 
	// imgLoad() {} // display cropper tool
	// initCropper() {} // init cropper
	// imgFailed() {} // error msg
	


	//profiles: Observable<any[]>;
	title = 'Angular My Personal Kitchen';
	email: string;
	password: string;


	constructor(firestore: AngularFirestore, public authenticationService: AuthService) {
		//this.profiles = firestore.collection('profiles').valueChanges();
		this.email = "";
		this.password = "";
	}


	signUp() {
		this.authenticationService.SignUp(this.email, this.password);
		this.email = '';
		this.password = '';
	}


	signIn() {
		this.authenticationService.SignIn(this.email, this.password);
		this.email = '';
		this.password = '';
	}


	signOut() {
		this.authenticationService.SignOut();
	}
}