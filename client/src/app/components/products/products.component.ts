import { Component, OnInit, Directive } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  form;
  messageClass: String;
  message: String;
  userRole: String;
  username: String;
  newProduct: Boolean = false;
  isProcessing: Boolean = false;
  products: [Object];
  imageName: String;
  public uploader: FileUploader = new FileUploader({ url: 'authentication/upload' });

  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.messageClass = 'hidden';
  }

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.authService.getProfile().subscribe(profile => {
        this.userRole = profile.user.role;
        this.username = profile.user.username;
      });
    }else {
      this.userRole = 'viewer';
    }
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data => {
      this.products = data.products;
    });
  }

  // onBlogSubmit(){
  //   this.isProcessing = true;
  //   this.disableNewBlogForm();
  //
  //   const blog = {
  //     title: this.form.get('title').value,
  //     body: this.form.get('body').value,
  //     image: this.imageName,
  //     createdBy: this.username
  //   }
  //
  //   this.blogService.newBlog(blog).subscribe(data => {
  //     if (!data.success){
  //       this.messageClass ='negative visible';
  //       this.message = data.message;
  //       this.isProcessing = true;
  //       this.enableNewBlogForm();
  //     }else {
  //       this.messageClass = 'positive visible';
  //       this.message = data.message;
  //       this.getAllBlogs();
  //       setTimeout(() => {
  //         this.newPost = false;
  //         this.isProcessing = false;
  //         this.messageClass = 'hidden';
  //         this.message = '';
  //         this.form.reset();
  //         this.enableNewBlogForm();
  //       }, 1000);
  //     }
  //   });
  // }

}
