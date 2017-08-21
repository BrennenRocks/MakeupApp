import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  messageClass: String;
  message: String;
  blog: any;
  isProcessing: Boolean = false;
  currentUrl: any;
  isLoading: Boolean = true;
  public uploader: FileUploader = new FileUploader({ url: 'authentication/upload' });

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {
    this.messageClass = 'hidden';

  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'negative visible';
        this.message = data.message;
      }else {
        this.blog = data.blog;
        this.isLoading = false;
      }

    });

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if(!response.success){
        this.messageClass = 'negative visible';
        this.message = response.message;
      }else{
        this.messageClass = 'positive visible';
        this.message = response.message;
        this.blog.image = '/images/' + Math.floor(Date.now() / 60000) + '_' + item.file.name;
      }
    };
  }

  updateBlogSubmit(){
    this.isProcessing = true;
    this.blogService.editBlog(this.blog).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'negative visible';
        this.message = data.message;
        this.isProcessing = false;
      }else {
        this.messageClass = 'positive visible';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/blog']);
        }, 1500);
      }
    });
  }

  goBack(){
    this.location.back();
  }

}
