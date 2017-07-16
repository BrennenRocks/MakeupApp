import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;
  messageClass: String;
  message: String;
  isProccessing: Boolean = false;
  previousUrl: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) { }

  ngOnInit() {
    this.createForm();
    this.messageClass = 'hidden';

    if (this.authGuard.redirectUrl) {
      this.messageClass = 'negative';
      this.message = 'You must be logged in to view that page';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

  createForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm(){
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  onLoginSubmit(){
    this.isProccessing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass ='negative visible';
        this.message = data.message;
        this.isProccessing = false;
        this.enableForm();
      }else {
        this.messageClass = 'positive visible';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          }else {
            this.router.navigate(['/dashboard']);
          }
        }, 1000)
      }
    });
  }

}
