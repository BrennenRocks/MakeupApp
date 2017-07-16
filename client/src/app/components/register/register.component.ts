import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;
  messageClass: String;
  message: String;
  isProcessing: Boolean = false;
  isEmailValid: Boolean = true;
  emailMessage: String;
  isUsernameValid: Boolean = true;
  usernameMessage: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();

    //Start the message as hidden
    this.messageClass = 'hidden';
  }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm') });
  }

  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm(){
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  validateEmail(controls){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(controls.value)){
      return null;
    }else {
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls){
    const re = /^[a-zA-Z0-9]+$/;
    if (re.test(controls.value)){
      return null
    }else {
      return { 'validateUsername': true }
    }
  }

  validatePassword(controls){
    const re = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/;
    if (re.test(controls.value)){
      return null
    }else {
      return { 'validatePassword': true }
    }
  }

  //Check if passwords are matching
  matchingPasswords(password, confirm){
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value){
        return null; //Passwords Match!
      }else {
        return { 'matchingPasswords': true} //return error
      }
    }
  }

  onRegisterSubmit(){
    this.isProcessing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'negative visible';
        this.message = data.message;
        this.isProcessing = false;
        this.enableForm();
      }else {
        this.messageClass = 'positive visible';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000)
      }
    });
  }

  checkEmail(){
    this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      if (!data.success) {
        this.isEmailValid = false;
        this.emailMessage = data.message;
      }else {
        this.isEmailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  checkUsername(){
    this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
      if (!data.success) {
        this.isUsernameValid = false;
        this.usernameMessage = data.message;
      }else {
        this.isUsernameValid = true;
        this.usernameMessage = data.message;
      }
    });
  }

}
