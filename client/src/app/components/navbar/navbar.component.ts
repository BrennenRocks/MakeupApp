import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

declare const $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  isLoading: Boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(this.authService.loggedIn()){
        if(val instanceof NavigationStart){
          this.authService.getProfile().subscribe(data => { //passes back username, email, and role, aboutMe, image
            this.user = data.user;
            this.isLoading = true;
          },
          err => {
            console.log(err);
            return false;
          });
        }
      }
    });

  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show("You are logged out", {cssClass: "ui positive message", timeout: 5000});
    this.router.navigate(['/']);
    this.user = "";
  }

}
