import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  messageClass: String;
  message: String;
  currentUrl: any;
  username: String;
  foundProfile: false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.messageClass = 'hidden';
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getPublicProfile(this.currentUrl.username).subscribe(data => { //Passing back username, email, and role
      if (!data.success) {
        this.messageClass = 'negative visible';
        this.message = data.message;
      }else{
        this.username = data.user.username;
      }

    })
  }

}
