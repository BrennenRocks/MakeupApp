import { Component, OnInit, Directive } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

declare const $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {

  form;
  commentForm;
  messageClass: String;
  message: String;
  userRole: String;
  username: String;
  newPost: Boolean = false;
  isProcessing: Boolean = false;
  blogPosts: [Object];
  imageName: String;
  newComment = [];
  enabledComments = [];
  public uploader: FileUploader = new FileUploader({ url: 'authentication/upload' });

  constructor(
    public authService: AuthService,
    private blogService: BlogService,
    private formBuilder: FormBuilder
  ) {
    this.messageClass = 'hidden';
  }

  ngOnInit() {
    this.createNewBlogForm();
    this.createCommentForm();
    if(this.authService.loggedIn()){
      this.authService.getProfile().subscribe(profile => {
        this.userRole = profile.user.role;
        this.username = profile.user.username;
      });
    }else {
      this.userRole = 'viewer';
    }
    this.getAllBlogs();

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if(!response.success){
        this.messageClass = 'negative visible';
        this.message = response.message;
      }else{
        this.messageClass = 'positive visible';
        this.message = response.message;
        this.imageName = '/images/' + Math.floor(Date.now() / 60000) + '_' + item.file.name;
      }
    };
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  createNewBlogForm(){
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ])]
    });
  }

  createCommentForm(){
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    })
  }

  disableCommentForm(){
    this.commentForm.get('comment').disable();
  }

  enableCommentForm(){
    this.commentForm.get('comment').enable();
  }

  disableNewBlogForm(){
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  enableNewBlogForm(){
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  alphaNumericValidation(controls){
    const re = /^[a-zA-Z0-9 ]+$/;
    if (re.test(controls.value)){
      return null;
    }else {
      return { 'alphaNumericValidation': true };
    }
  }

  newBlogForm(){
    this.newPost = true;
  }

  draftComment(id){
    this.commentForm.reset();
    this.newComment = [];
    this.newComment.push(id);
  }

  cancelSubmission(id){
    const index = this.newComment.indexOf(id);
    this.newComment.splice(index, 1);
    this.commentForm.reset();
    this.enableCommentForm();
    this.isProcessing = false;
  }

  postComment(id){
    this.disableCommentForm();
    this.isProcessing = true;
    const comment = this.commentForm.get('comment').value;
    this.blogService.postComment(id, comment).subscribe(data => {
      this.getAllBlogs();
      const index = this.newComment.indexOf(id);
      this.newComment.splice(index, 1);
      this.enableCommentForm();
      this.commentForm.reset();
      this.isProcessing = false;
      if (this.enabledComments.indexOf(0) < 0) this.expand(id);
    });
  }

  expand(id){
    this.enabledComments.push(id);
  }

  collapse(id){
    const index = this.enabledComments.indexOf(id);
    this.enabledComments.splice(index, 1);
  }

  onBlogSubmit(){
    this.isProcessing = true;
    this.disableNewBlogForm();

    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      image: this.imageName,
      createdBy: this.username
    }

    this.blogService.newBlog(blog).subscribe(data => {
      if (!data.success){
        this.messageClass ='negative visible';
        this.message = data.message;
        this.isProcessing = true;
        this.enableNewBlogForm();
      }else {
        this.messageClass = 'positive visible';
        this.message = data.message;
        this.getAllBlogs();
        setTimeout(() => {
          this.newPost = false;
          this.isProcessing = false;
          this.messageClass = 'hidden';
          this.message = '';
          this.form.reset();
          this.enableNewBlogForm();
        }, 1000);
      }
    });
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs;
    });
  }

  goBack(){
    this.form.setValue({
      'title': "",
      'body': ""
    });
    this.newPost = false;
  }

  likeBlog(id){
    if(this.authService.loggedIn()){
      this.blogService.likeBlog(id).subscribe(data => {
        this.getAllBlogs();
      });
    }else{
      this.messageClass = 'negative visible';
      this.message = "You must be logged in to like a post";
    }
  }

  dislikeBlog(id){
    if(this.authService.loggedIn()){
      this.blogService.dislikeBlog(id).subscribe(data => {
        this.getAllBlogs();
      });
    }else{
      this.messageClass = 'negative visible';
      this.message = "You must be logged in to dislike a post";
    }
  }

}
