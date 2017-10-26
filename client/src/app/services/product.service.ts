import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  options: any;
  domain: String = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  createAuthenticationHeaders(){
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  getAllProducts(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'products/allProducts', this.options).map(res => res.json());
  }

  newProduct(product){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'products/newProduct', product, this.options).map(res => res.json());
  }

}
