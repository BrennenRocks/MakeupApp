import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  messageClass: String;
  message: String;
  user: any;
  isLoading: Boolean = true;
  isProcessing: Boolean = false;
  editMode: Boolean = false;
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:8080/authentication/upload' });

  constructor(
    private authService: AuthService,
  ) {
    this.messageClass = 'hidden';
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.isLoading = false;
    });

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if(!response.success){
        this.messageClass = 'negative visible';
        this.message = response.message;
      }else{
        this.messageClass = 'positive visible';
        this.message = response.message;
        this.user.image = '/images/' + Math.floor(Date.now() / 60000) + '_' + item.file.name;
      }
    };
  }

  enableEditMode(){
    this.editMode = true;
  }

  updateUserSubmit(){
    this.isProcessing = true;
    this.authService.editUser(this.user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'negative visible';
        this.message = data.message;
        this.isProcessing = false;
      }else {
        this.messageClass = 'positive visible';
        this.message = data.message;
        setTimeout(() => {
          this.editMode = false;
          this.isProcessing = false;
          this.messageClass = 'hidden';
        }, 1500);
      }
    });
  }

  cancelEdit(){
    this.editMode = false;
    this.isProcessing = false;
  }

}
