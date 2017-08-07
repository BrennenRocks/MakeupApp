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

  username: String;

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(this.authService.loggedIn()){
        if(val instanceof NavigationStart){
          this.authService.getProfile().subscribe(data => { //passes back username, email, and role
            this.username = data.user.username;
          },
          err => {
            console.log(err);
            return false;
          });
        }
      }
    });

    $('.menu .browse').popup({
        inline   : true,
        hoverable: true,
        position : 'bottom left',
        lastResort: 'bottom left',
        delay: {
          show: 300,
          hide: 500
        }
      });
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show("You are logged out", {cssClass: "ui positive message", timeout: 5000});
    this.router.navigate(['/']);
  }

}
