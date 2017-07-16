import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Injectable()
export class AdminGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  canActivate() {
    if (this.authService.loggedIn() && this.authService.isAdmin()){
      return true;
    }else {
      this.flashMessagesService.show("You must be an admin to do that!", {cssClass: "ui negative message", timeout: 5000});
      this.router.navigate(['/blog']);
      return false;
    }
  }
}
