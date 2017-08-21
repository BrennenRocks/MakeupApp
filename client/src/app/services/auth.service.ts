import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = "http://localhost:8080/";
  authToken: any;
  userRole: String;
  user: any;
  options: any;

  constructor(
    private http: Http
  ) { }

  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
  }

  isAdmin(){
    if (this.loggedIn() && JSON.parse(localStorage.getItem('user')).role === "admin"){
      return true
    }else {
      return false;
    }
  }

  //Register User Accounts
  registerUser(user){
    return this.http.post(this.domain + 'authentication/register', user).map(res => res.json());
  }

  //Check if Username is Taken
  checkUsername(username){
    return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(res => res.json());
  }

  //Check if Email is Taken
  checkEmail(email){
    return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
  }

  login(user){
    return this.http.post(this.domain + 'authentication/login', user).map(res => res.json());
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //Put User Data into local storage
  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
  }

  editUser(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/updateUser', user, this.options).map(res => res.json());
  }

  getPublicProfile(username){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/publicProfile/' + username, this.options).map(res => res.json());
  }

  loggedIn(){
    return tokenNotExpired();
  }

}
