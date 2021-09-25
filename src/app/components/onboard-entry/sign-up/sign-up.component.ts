import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import Validation from 'src/app/shared/services/validation';
import * as bootstrap from 'bootstrap';
import { Button } from 'bootstrap';
import toast from 'bootstrap/js/dist/toast';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'signup',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	faCoffee = faCoffee;
	faEye = faEye;

	//@ViewChild('myToast', { static: true }) myToast!: bootstrap.Toast; // | undefined;

	submitted: boolean = false;
	form: FormGroup;

	_username!: string;
	_email!: string;
	_password!: string;
	_confirm_password!: string;

	message!: string;

	_emailIsValid: boolean = false;
	_passwordIsValid: boolean = false;
	isValid: boolean = (this._emailIsValid && this._passwordIsValid);

	showHidePassword: string = " Show";
	showHideConfirmPassword: string = " Show";





	//testing node loop
	hideNodeListItems(): void {	
		for (var i = 0; i < document.getElementsByClassName('alert alert-danger').length; i++) {
			document.getElementsByClassName('alert alert-danger')[i].setAttribute('style','display:none')
		}
	};

	constructor(
		public authService: AuthService, private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
				username: ['', [
					Validators.email,
					Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
					Validators.required
					]],
				email: ['', [
					Validators.email,
					Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
					Validators.required
				]],
				//Min 8, max 20 characters, 
				//	at least 1 uppercase, 
				//	1 lowercase letter, 
				//	1 number and 
				//	1 special character
				password: ['', [
					Validators.maxLength(20),
					Validators.minLength(8),
					Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$'),
					Validators.required
				]],
				confirm_password: ['', [
					Validators.maxLength(40),
					Validators.minLength(6),
					Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
					Validators.required
				]]
			}
		);
	}



	ngOnInit(): void {}



	//FOR THE COMPONENT
	createToast() {
		console.log("Inside createToast.");
		console.log("toastTrigger just clicked for emailToast.");
		const toastLiveExample = document.getElementById('emailToast');

		var options = {
			animation: true,
			autohide: true,
			delay: 5000
		};
		var toast = new bootstrap.Toast(toastLiveExample!, options);
		toast.show();
	}



	closeToast() {
		let _emailToastDIV = document.querySelector("#emailToast");
		_emailToastDIV?.remove();
	}



	showToast(message: string, bootstrap_color_class: string) {
		let _emailToastDIV = document.querySelector("#emailToast");

		const emailToast = new bootstrap.Toast(_emailToastDIV!, {
			animation: true,
			autohide: true,
			delay: 5000 //900000
		});

		_emailToastDIV!.innerHTML = message;

		if (bootstrap_color_class === 'btn-danger') {
			_emailToastDIV?.classList.remove('btn-success');
		}

		if (bootstrap_color_class === 'btn-success') {
			_emailToastDIV?.classList.remove('btn-danger');
			_emailToastDIV!.setAttribute('style', 'background-color: #198754');
		}

		emailToast.show();
	}



	onBlur_validateEmail(fieldname: HTMLInputElement) {

		//Email regex
		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		//Retursns true or false;
		let emailIsValid =  regex.test(String(fieldname.value).toLowerCase());

		//if the email is invalid, then show a message.
		if (!emailIsValid) {
			document.getElementById('emailToast')?.focus();
			this.showToast(fieldname.value + ' is mal-formed.', 'btn-danger');
			return;
		}

		this.showToast(fieldname.value + ' is accepted.', 'btn-success');
		this._emailIsValid = true;
	} //onBlur_validateEmail


		
		// if (this.isValid) {
		// 	this.showToast('Success.', 'btn-success');
		// }

		//this.isValid enables the 'Register' button.
		//this.isValid = !this.isValid;

	get username() {
		return this.form.get('username');
	}
	get email() {
		return this.form.get('email');
	}
	get password() {
		return this.form.get('password');
	}
	get confirm_password() {
		return this.form.get('confirm_password');
	}



	onSubmit() {
		console.log("Inside onSubmit().");
		console.log(this.form?.value);

		//Logical to use isValid: boolean = true; here?
		//this.isValid = true;


		// this.authService.SignUp(this.email, this.password)
		// 	.then((res)=>{
		// 		debugger;
		// 		console.log("res: " + res);
		// 		console.table([res]);
		// 	});
	}
	onReset(): void {
		console.log('onReset clicked.');
	}



	public control(fieldname: string) {
		return this.form.get(fieldname);
	}



	private isMatch(control: AbstractControl) : ValidationErrors | null {
		if (control.value === null) {
			return null;
		}

		let isMatched = Validation.match("username", "email");
		console.log('isMatched: ' + isMatched);
		console.table([isMatched]);
		return isMatched;
	}



	//Remove after fixing the reactive forms
	signUp(): void {
		console.log("Inside signUp().");
		// this.authService.SignUp(this.email, this.password)
		// 	.then((res)=>{
		// 		debugger;
		// 		console.log("res: " + res);
		// 		console.table([res]);
		// 	});
	}



	//Fires onblur.
	async confirmEmailMatch(fieldname: string): Promise<string> {
		console.log("Email address match confirmed.");
		
//		let _result = await this.onBlur_validateEmail('username');
//		console.log("_result: " + _result);


		return '';
	};



	//User choice - show or hide password during entry.
	togglePasswordVisibility(): void {

		let _password = document.querySelector("#password");
		let _type = _password?.getAttribute('type');

		let _showPasswordEye = document.querySelector('#showPasswordEye');

		if (_type === "password") {
			_password?.removeAttribute('type');
			_password?.setAttribute('type', 'text');
			_showPasswordEye?.setAttribute('style', "color: #00f800");
			this.showHidePassword = " Hide";
		} else {
			_password?.removeAttribute('type');
			_password?.setAttribute('type', 'password');
			_showPasswordEye?.setAttribute('style', "color: #f00");
			this.showHidePassword = " Show";
		}
	};



	//Fires onblur.
	confirmPasswordMatch(): void {
		console.log("Password match confirmed.");
	};



	//User choice - show or hide confirm password during entry.
	toggleConfirmPasswordVisibility(): void {

		let _confirm_password = document.querySelector("#confirm_password");
		let _type = _confirm_password?.getAttribute('type');

		let _showConfirmPasswordEye = document.querySelector('#showConfirmPasswordEye');

		if (_type === "password") {
			_confirm_password?.removeAttribute('type');
			_confirm_password?.setAttribute('type', 'text');
			_showConfirmPasswordEye?.setAttribute('style', "color: #00f800");
			this.showHideConfirmPassword = " Hide";
		} else {
			_confirm_password?.removeAttribute('type');
			_confirm_password?.setAttribute('type', 'password');
			_showConfirmPasswordEye?.setAttribute('style', "color: #f00");
			this.showHideConfirmPassword = " Show";
		}
	};



	//Navigate to the sign-in view.
	go(location:string): void {
		window.location.replace ('/home');
	};
}