webpackJsonp([1,5],{

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BlogService = (function () {
    function BlogService(authService, http) {
        this.authService = authService;
        this.http = http;
        this.domain = this.authService.domain;
    }
    BlogService.prototype.createAuthenticationHeaders = function () {
        this.authService.loadToken();
        this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]({
                'Content-Type': 'application/json',
                'authorization': this.authService.authToken
            })
        });
    };
    BlogService.prototype.newBlog = function (blog) {
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'blogs/newBlog', blog, this.options).map(function (res) { return res.json(); });
    };
    BlogService.prototype.getAllBlogs = function () {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'blogs/allBlogs', this.options).map(function (res) { return res.json(); });
    };
    BlogService.prototype.getSingleBlog = function (id) {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'blogs/singleBlog/' + id, this.options).map(function (res) { return res.json(); });
    };
    BlogService.prototype.editBlog = function (blog) {
        this.createAuthenticationHeaders();
        return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options).map(function (res) { return res.json(); });
    };
    BlogService.prototype.deleteBlog = function (id) {
        this.createAuthenticationHeaders();
        return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, this.options).map(function (res) { return res.json(); });
    };
    BlogService.prototype.likeBlog = function (id) {
        var blogData = { id: id };
        return this.http.put(this.domain + 'blogs/likeBlog', blogData, this.options).map(function (res) { return res.json(); });
    };
    BlogService.prototype.dislikeBlog = function (id) {
        var blogData = { id: id };
        return this.http.put(this.domain + 'blogs/dislikeBlog', blogData, this.options).map(function (res) { return res.json(); });
    };
    BlogService.prototype.postComment = function (id, comment) {
        this.createAuthenticationHeaders();
        var blogData = {
            id: id,
            comment: comment
        };
        return this.http.post(this.domain + 'blogs/comment', blogData, this.options).map(function (res) { return res.json(); });
    };
    BlogService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === 'function' && _b) || Object])
    ], BlogService);
    return BlogService;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/blog.service.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (router, state) {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.redirectUrl = state.url;
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/auth.guard.js.map

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.domain = "";
    }
    AuthService.prototype.createAuthenticationHeaders = function () {
        this.loadToken();
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
                'Content-Type': 'application/json',
                'authorization': this.authToken
            })
        });
    };
    AuthService.prototype.loadToken = function () {
        this.authToken = localStorage.getItem('token');
    };
    AuthService.prototype.isAdmin = function () {
        if (this.loggedIn() && JSON.parse(localStorage.getItem('user')).role === "admin") {
            return true;
        }
        else {
            return false;
        }
    };
    //Register User Accounts
    AuthService.prototype.registerUser = function (user) {
        return this.http.post(this.domain + 'authentication/register', user).map(function (res) { return res.json(); });
    };
    //Check if Username is Taken
    AuthService.prototype.checkUsername = function (username) {
        return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(function (res) { return res.json(); });
    };
    //Check if Email is Taken
    AuthService.prototype.checkEmail = function (email) {
        return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(function (res) { return res.json(); });
    };
    AuthService.prototype.login = function (user) {
        return this.http.post(this.domain + 'authentication/login', user).map(function (res) { return res.json(); });
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    //Put User Data into local storage
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.getProfile = function () {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'authentication/profile', this.options).map(function (res) { return res.json(); });
    };
    AuthService.prototype.editUser = function (user) {
        this.createAuthenticationHeaders();
        return this.http.put(this.domain + 'authentication/updateUser', user, this.options).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getPublicProfile = function (username) {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'authentication/publicProfile/' + username, this.options).map(function (res) { return res.json(); });
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])();
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/auth.service.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_blog_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload_ng2_file_upload__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_file_upload_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BlogComponent = (function () {
    function BlogComponent(authService, blogService, formBuilder) {
        this.authService = authService;
        this.blogService = blogService;
        this.formBuilder = formBuilder;
        this.newPost = false;
        this.isProcessing = false;
        this.newComment = [];
        this.enabledComments = [];
        this.uploader = new __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload_ng2_file_upload__["FileUploader"]({ url: 'authentication/upload' });
        this.messageClass = 'hidden';
    }
    BlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createNewBlogForm();
        this.createCommentForm();
        if (this.authService.loggedIn()) {
            this.authService.getProfile().subscribe(function (profile) {
                _this.userRole = profile.user.role;
                _this.username = profile.user.username;
            });
        }
        else {
            this.userRole = 'viewer';
        }
        this.getAllBlogs();
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            response = JSON.parse(response);
            if (!response.success) {
                _this.messageClass = 'negative visible';
                _this.message = response.message;
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = response.message;
                _this.imageName = '/images/' + Math.floor(Date.now() / 60000) + '_' + item.file.name;
            }
        };
    };
    BlogComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    BlogComponent.prototype.createNewBlogForm = function () {
        this.form = this.formBuilder.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].maxLength(50),
                    this.alphaNumericValidation
                ])],
            body: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].maxLength(500)
                ])]
        });
    };
    BlogComponent.prototype.createCommentForm = function () {
        this.commentForm = this.formBuilder.group({
            comment: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].minLength(1),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].maxLength(200)
                ])]
        });
    };
    BlogComponent.prototype.disableCommentForm = function () {
        this.commentForm.get('comment').disable();
    };
    BlogComponent.prototype.enableCommentForm = function () {
        this.commentForm.get('comment').enable();
    };
    BlogComponent.prototype.disableNewBlogForm = function () {
        this.form.get('title').disable();
        this.form.get('body').disable();
    };
    BlogComponent.prototype.enableNewBlogForm = function () {
        this.form.get('title').enable();
        this.form.get('body').enable();
    };
    BlogComponent.prototype.alphaNumericValidation = function (controls) {
        var re = /^[a-zA-Z0-9 ]+$/;
        if (re.test(controls.value)) {
            return null;
        }
        else {
            return { 'alphaNumericValidation': true };
        }
    };
    BlogComponent.prototype.newBlogForm = function () {
        this.newPost = true;
    };
    BlogComponent.prototype.draftComment = function (id) {
        this.commentForm.reset();
        this.newComment = [];
        this.newComment.push(id);
    };
    BlogComponent.prototype.cancelSubmission = function (id) {
        var index = this.newComment.indexOf(id);
        this.newComment.splice(index, 1);
        this.commentForm.reset();
        this.enableCommentForm();
        this.isProcessing = false;
    };
    BlogComponent.prototype.postComment = function (id) {
        var _this = this;
        this.disableCommentForm();
        this.isProcessing = true;
        var comment = this.commentForm.get('comment').value;
        this.blogService.postComment(id, comment).subscribe(function (data) {
            _this.getAllBlogs();
            var index = _this.newComment.indexOf(id);
            _this.newComment.splice(index, 1);
            _this.enableCommentForm();
            _this.commentForm.reset();
            _this.isProcessing = false;
            if (_this.enabledComments.indexOf(0) < 0)
                _this.expand(id);
        });
    };
    BlogComponent.prototype.expand = function (id) {
        this.enabledComments.push(id);
    };
    BlogComponent.prototype.collapse = function (id) {
        var index = this.enabledComments.indexOf(id);
        this.enabledComments.splice(index, 1);
    };
    BlogComponent.prototype.onBlogSubmit = function () {
        var _this = this;
        this.isProcessing = true;
        this.disableNewBlogForm();
        var blog = {
            title: this.form.get('title').value,
            body: this.form.get('body').value,
            image: this.imageName,
            createdBy: this.username
        };
        this.blogService.newBlog(blog).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
                _this.isProcessing = true;
                _this.enableNewBlogForm();
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = data.message;
                _this.getAllBlogs();
                setTimeout(function () {
                    _this.newPost = false;
                    _this.isProcessing = false;
                    _this.messageClass = 'hidden';
                    _this.message = '';
                    _this.form.reset();
                    _this.enableNewBlogForm();
                }, 1000);
            }
        });
    };
    BlogComponent.prototype.getAllBlogs = function () {
        var _this = this;
        this.blogService.getAllBlogs().subscribe(function (data) {
            _this.blogPosts = data.blogs;
        });
    };
    BlogComponent.prototype.goBack = function () {
        this.form.setValue({
            'title': "",
            'body': ""
        });
        this.newPost = false;
    };
    BlogComponent.prototype.likeBlog = function (id) {
        var _this = this;
        if (this.authService.loggedIn()) {
            this.blogService.likeBlog(id).subscribe(function (data) {
                _this.getAllBlogs();
            });
        }
        else {
            this.messageClass = 'negative visible';
            this.message = "You must be logged in to like a post";
        }
    };
    BlogComponent.prototype.dislikeBlog = function (id) {
        var _this = this;
        if (this.authService.loggedIn()) {
            this.blogService.dislikeBlog(id).subscribe(function (data) {
                _this.getAllBlogs();
            });
        }
        else {
            this.messageClass = 'negative visible';
            this.message = "You must be logged in to dislike a post";
        }
    };
    BlogComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-blog',
            template: __webpack_require__(717),
            styles: [__webpack_require__(704)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_blog_service__["a" /* BlogService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_blog_service__["a" /* BlogService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormBuilder */]) === 'function' && _c) || Object])
    ], BlogComponent);
    return BlogComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/blog.component.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_blog_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteBlogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeleteBlogComponent = (function () {
    function DeleteBlogComponent(blogService, activatedRoute, router) {
        this.blogService = blogService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.foundBlog = false;
        this.isProcessing = false;
        this.messageClass = 'hidden';
    }
    DeleteBlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.blogService.getSingleBlog(this.currentUrl.id).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
            }
            else {
                _this.blog = {
                    title: data.blog.title,
                    body: data.blog.body,
                    createdBy: data.blog.createdBy,
                    createdAt: data.blog.createdAt
                };
                _this.foundBlog = true;
            }
        });
    };
    DeleteBlogComponent.prototype.deleteBlog = function () {
        var _this = this;
        this.isProcessing = true;
        this.blogService.deleteBlog(this.currentUrl.id).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(['/blog']);
                }, 1500);
            }
        });
    };
    DeleteBlogComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-delete-blog',
            template: __webpack_require__(718),
            styles: [__webpack_require__(705)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_blog_service__["a" /* BlogService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_blog_service__["a" /* BlogService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], DeleteBlogComponent);
    return DeleteBlogComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/delete-blog.component.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_blog_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload_ng2_file_upload__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_file_upload_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditBlogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditBlogComponent = (function () {
    function EditBlogComponent(location, router, activatedRoute, blogService) {
        this.location = location;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.blogService = blogService;
        this.isProcessing = false;
        this.isLoading = true;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload_ng2_file_upload__["FileUploader"]({ url: 'authentication/upload' });
        this.messageClass = 'hidden';
    }
    EditBlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.blogService.getSingleBlog(this.currentUrl.id).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
            }
            else {
                _this.blog = data.blog;
                _this.isLoading = false;
            }
        });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            response = JSON.parse(response);
            if (!response.success) {
                _this.messageClass = 'negative visible';
                _this.message = response.message;
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = response.message;
                _this.blog.image = '/images/' + Math.floor(Date.now() / 60000) + '_' + item.file.name;
            }
        };
    };
    EditBlogComponent.prototype.updateBlogSubmit = function () {
        var _this = this;
        this.isProcessing = true;
        this.blogService.editBlog(this.blog).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
                _this.isProcessing = false;
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(['/blog']);
                }, 1500);
            }
        });
    };
    EditBlogComponent.prototype.goBack = function () {
        this.location.back();
    };
    EditBlogComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-blog',
            template: __webpack_require__(719),
            styles: [__webpack_require__(706)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_blog_service__["a" /* BlogService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_blog_service__["a" /* BlogService */]) === 'function' && _d) || Object])
    ], EditBlogComponent);
    return EditBlogComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/edit-blog.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(720),
            styles: [__webpack_require__(707)]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/dashboard.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(authService) {
        this.authService = authService;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(721),
            styles: [__webpack_require__(708)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/home.component.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guards_auth_guard__ = __webpack_require__(223);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(formBuilder, authService, router, authGuard) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.authGuard = authGuard;
        this.isProccessing = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.messageClass = 'hidden';
        if (this.authGuard.redirectUrl) {
            this.messageClass = 'negative';
            this.message = 'You must be logged in to view that page';
            this.previousUrl = this.authGuard.redirectUrl;
            this.authGuard.redirectUrl = undefined;
        }
    };
    LoginComponent.prototype.createForm = function () {
        this.form = this.formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
        });
    };
    LoginComponent.prototype.disableForm = function () {
        this.form.controls['username'].disable();
        this.form.controls['password'].disable();
    };
    LoginComponent.prototype.enableForm = function () {
        this.form.controls['username'].enable();
        this.form.controls['password'].enable();
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        this.isProccessing = true;
        this.disableForm();
        var user = {
            username: this.form.get('username').value,
            password: this.form.get('password').value
        };
        this.authService.login(user).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
                _this.isProccessing = false;
                _this.enableForm();
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = data.message;
                _this.authService.storeUserData(data.token, data.user);
                setTimeout(function () {
                    if (_this.previousUrl) {
                        _this.router.navigate([_this.previousUrl]);
                    }
                    else {
                        _this.router.navigate(['/dashboard']);
                    }
                }, 500);
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(722),
            styles: [__webpack_require__(709)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__guards_auth_guard__["a" /* AuthGuard */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__guards_auth_guard__["a" /* AuthGuard */]) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/login.component.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProductsComponent = (function () {
    function ProductsComponent() {
    }
    ProductsComponent.prototype.ngOnInit = function () {
    };
    ProductsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-products',
            template: __webpack_require__(724),
            styles: [__webpack_require__(711)]
        }), 
        __metadata('design:paramtypes', [])
    ], ProductsComponent);
    return ProductsComponent;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/products.component.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload_ng2_file_upload__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_file_upload_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(authService) {
        this.authService = authService;
        this.isLoading = true;
        this.isProcessing = false;
        this.editMode = false;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload_ng2_file_upload__["FileUploader"]({ url: 'authentication/upload' });
        this.messageClass = 'hidden';
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
            _this.isLoading = false;
        });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            response = JSON.parse(response);
            if (!response.success) {
                _this.messageClass = 'negative visible';
                _this.message = response.message;
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = response.message;
                _this.user.image = '/images/' + Math.floor(Date.now() / 60000) + '_' + item.file.name;
            }
        };
    };
    ProfileComponent.prototype.enableEditMode = function () {
        this.editMode = true;
    };
    ProfileComponent.prototype.updateUserSubmit = function () {
        var _this = this;
        this.isProcessing = true;
        this.authService.editUser(this.user).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
                _this.isProcessing = false;
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = data.message;
                setTimeout(function () {
                    _this.editMode = false;
                    _this.isProcessing = false;
                    _this.messageClass = 'hidden';
                }, 1500);
            }
        });
    };
    ProfileComponent.prototype.cancelEdit = function () {
        this.editMode = false;
        this.isProcessing = false;
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(725),
            styles: [__webpack_require__(712)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/profile.component.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PublicProfileComponent = (function () {
    function PublicProfileComponent(authService, activatedRoute) {
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.foundProfile = false;
        this.messageClass = 'hidden';
    }
    PublicProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.authService.getPublicProfile(this.currentUrl.username).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
            }
            else {
                _this.user = data.user;
                _this.foundProfile = true;
            }
        });
    };
    PublicProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-public-profile',
            template: __webpack_require__(726),
            styles: [__webpack_require__(713)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], PublicProfileComponent);
    return PublicProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/public-profile.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(formBuilder, authService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.isProcessing = false;
        this.isEmailValid = true;
        this.isUsernameValid = true;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.createForm();
        //Start the message as hidden
        this.messageClass = 'hidden';
    };
    RegisterComponent.prototype.createForm = function () {
        this.form = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].maxLength(30),
                    this.validateEmail
                ])],
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(3),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].maxLength(15),
                    this.validateUsername
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(8),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].maxLength(35),
                    this.validatePassword
                ])],
            confirm: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
        }, { validator: this.matchingPasswords('password', 'confirm') });
    };
    RegisterComponent.prototype.disableForm = function () {
        this.form.controls['email'].disable();
        this.form.controls['username'].disable();
        this.form.controls['password'].disable();
        this.form.controls['confirm'].disable();
    };
    RegisterComponent.prototype.enableForm = function () {
        this.form.controls['email'].enable();
        this.form.controls['username'].enable();
        this.form.controls['password'].enable();
        this.form.controls['confirm'].enable();
    };
    RegisterComponent.prototype.validateEmail = function (controls) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(controls.value)) {
            return null;
        }
        else {
            return { 'validateEmail': true };
        }
    };
    RegisterComponent.prototype.validateUsername = function (controls) {
        var re = /^[a-zA-Z0-9]+$/;
        if (re.test(controls.value)) {
            return null;
        }
        else {
            return { 'validateUsername': true };
        }
    };
    RegisterComponent.prototype.validatePassword = function (controls) {
        var re = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/;
        if (re.test(controls.value)) {
            return null;
        }
        else {
            return { 'validatePassword': true };
        }
    };
    //Check if passwords are matching
    RegisterComponent.prototype.matchingPasswords = function (password, confirm) {
        return function (group) {
            if (group.controls[password].value === group.controls[confirm].value) {
                return null; //Passwords Match!
            }
            else {
                return { 'matchingPasswords': true }; //return error
            }
        };
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        this.isProcessing = true;
        this.disableForm();
        var user = {
            email: this.form.get('email').value,
            username: this.form.get('username').value,
            password: this.form.get('password').value
        };
        this.authService.registerUser(user).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'negative visible';
                _this.message = data.message;
                _this.isProcessing = false;
                _this.enableForm();
            }
            else {
                _this.messageClass = 'positive visible';
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(['/login']);
                }, 2000);
            }
        });
    };
    RegisterComponent.prototype.checkEmail = function () {
        var _this = this;
        this.authService.checkEmail(this.form.get('email').value).subscribe(function (data) {
            if (!data.success) {
                _this.isEmailValid = false;
                _this.emailMessage = data.message;
            }
            else {
                _this.isEmailValid = true;
                _this.emailMessage = data.message;
            }
        });
    };
    RegisterComponent.prototype.checkUsername = function () {
        var _this = this;
        this.authService.checkUsername(this.form.get('username').value).subscribe(function (data) {
            if (!data.success) {
                _this.isUsernameValid = false;
                _this.usernameMessage = data.message;
            }
            else {
                _this.isUsernameValid = true;
                _this.usernameMessage = data.message;
            }
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(727),
            styles: [__webpack_require__(714)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/register.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminGuard = (function () {
    function AdminGuard(authService, router, flashMessagesService) {
        this.authService = authService;
        this.router = router;
        this.flashMessagesService = flashMessagesService;
    }
    AdminGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn() && this.authService.isAdmin()) {
            return true;
        }
        else {
            this.flashMessagesService.show("You must be an admin to do that!", { cssClass: "ui negative message", timeout: 5000 });
            this.router.navigate(['/blog']);
            return false;
        }
    };
    AdminGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], AdminGuard);
    return AdminGuard;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/admin.guard.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotAuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotAuthGuard = (function () {
    function NotAuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    NotAuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        else {
            return true;
        }
    };
    NotAuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], NotAuthGuard);
    return NotAuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/notAuth.guard.js.map

/***/ }),

/***/ 414:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 414;


/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(536);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/main.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_dashboard_dashboard_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_register_register_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_login_login_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_profile_profile_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_public_profile_public_profile_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__guards_auth_guard__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__guards_notAuth_guard__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__guards_admin_guard__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_products_products_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_blog_blog_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_blog_edit_blog_edit_blog_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_blog_delete_blog_delete_blog_component__ = __webpack_require__(340);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_3__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_6__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'user/:username', component: __WEBPACK_IMPORTED_MODULE_7__components_public_profile_public_profile_component__["a" /* PublicProfileComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_4__components_register_register_component__["a" /* RegisterComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_notAuth_guard__["a" /* NotAuthGuard */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__components_login_login_component__["a" /* LoginComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_notAuth_guard__["a" /* NotAuthGuard */]] },
    { path: 'products', component: __WEBPACK_IMPORTED_MODULE_11__components_products_products_component__["a" /* ProductsComponent */] },
    { path: 'blog', component: __WEBPACK_IMPORTED_MODULE_12__components_blog_blog_component__["a" /* BlogComponent */] },
    { path: 'edit-blog/:id', component: __WEBPACK_IMPORTED_MODULE_13__components_blog_edit_blog_edit_blog_component__["a" /* EditBlogComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_admin_guard__["a" /* AdminGuard */]] },
    { path: 'delete-blog/:id', component: __WEBPACK_IMPORTED_MODULE_14__components_blog_delete_blog_delete_blog_component__["a" /* DeleteBlogComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_admin_guard__["a" /* AdminGuard */]] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__["a" /* HomeComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [],
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(appRoutes)],
            providers: [],
            bootstrap: [],
            exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/app-routing.module.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(716),
            styles: [__webpack_require__(703)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/app.component.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_navbar_navbar_component__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_login_login_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_blog_blog_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_blog_edit_blog_edit_blog_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_products_products_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_blog_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__guards_notAuth_guard__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__guards_admin_guard__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__directives_initialize_popup_directive__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_blog_delete_blog_delete_blog_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_public_profile_public_profile_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__directives_initialize_dropdown_directive__ = __webpack_require__(538);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_products_products_component__["a" /* ProductsComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_blog_blog_component__["a" /* BlogComponent */],
                __WEBPACK_IMPORTED_MODULE_22__directives_initialize_popup_directive__["a" /* InitializePopupDirective */],
                __WEBPACK_IMPORTED_MODULE_15__components_blog_edit_blog_edit_blog_component__["a" /* EditBlogComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_blog_delete_blog_delete_blog_component__["a" /* DeleteBlogComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_public_profile_public_profile_component__["a" /* PublicProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_25__directives_initialize_dropdown_directive__["a" /* InitializeDropdownDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__["FlashMessagesModule"],
                __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__["FileUploadModule"]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_20__guards_notAuth_guard__["a" /* NotAuthGuard */], __WEBPACK_IMPORTED_MODULE_21__guards_admin_guard__["a" /* AdminGuard */], __WEBPACK_IMPORTED_MODULE_18__services_blog_service__["a" /* BlogService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/app.module.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessagesService) {
        this.authService = authService;
        this.router = router;
        this.flashMessagesService = flashMessagesService;
        this.isLoading = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (val) {
            if (_this.authService.loggedIn()) {
                if (val instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* NavigationStart */]) {
                    _this.authService.getProfile().subscribe(function (data) {
                        _this.user = data.user;
                        _this.isLoading = true;
                    }, function (err) {
                        console.log(err);
                        return false;
                    });
                }
            }
        });
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessagesService.show("You are logged out", { cssClass: "ui positive message", timeout: 5000 });
        this.router.navigate(['/']);
        this.user = "";
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(723),
            styles: [__webpack_require__(710)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/navbar.component.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitializeDropdownDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InitializeDropdownDirective = (function () {
    function InitializeDropdownDirective(el) {
        this.el = el;
    }
    InitializeDropdownDirective.prototype.ngOnInit = function () {
        $('.user.dropdown').dropdown();
    };
    InitializeDropdownDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '.ui.dropdown'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object])
    ], InitializeDropdownDirective);
    return InitializeDropdownDirective;
    var _a;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/initialize-dropdown.directive.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitializePopupDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InitializePopupDirective = (function () {
    function InitializePopupDirective(el) {
        this.el = el;
    }
    InitializePopupDirective.prototype.ngOnInit = function () {
        //$('activating element').popup();
        $('.like.button').popup({
            position: 'bottom left',
            transition: 'drop',
            hoverable: true
        });
        $('.dislike.button').popup({
            position: 'bottom right',
            transition: 'drop',
            hoverable: true
        });
        $('.menu .user').popup({
            inline: true,
            hoverable: true,
            on: 'click',
            closable: true,
            position: 'bottom left',
            lastRestort: 'bottom left'
        });
        $('.menu .product').popup({
            inline: true,
            hoverable: true,
            position: 'bottom left',
            lastResort: 'bottom left',
            delay: {
                show: 300,
                hide: 500
            }
        });
    };
    InitializePopupDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '.ui.popup'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object])
    ], InitializePopupDirective);
    return InitializePopupDirective;
    var _a;
}());
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/initialize-popup.directive.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Brennen/Desktop/Projects/_makeup/client/src/environment.js.map

/***/ }),

/***/ 703:
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ 704:
/***/ (function(module, exports) {

module.exports = ".ui.popup{\r\n  padding:0;\r\n}\r\n/* Like and Dislike popup Scrolling */\r\n.ui.popup .list {\r\n  max-height:150px;\r\n  overflow:hidden;\r\n  overflow-y:scroll;\r\n  padding:10px;\r\n}\r\n\r\n/* Form Success Input */\r\n.ui.form .field.success label {\r\n    color: #308330;\r\n}\r\n.ui.form .field.success input {\r\n    background: #f4faf4 none repeat scroll 0 0;\r\n    border-color: #a3c293;\r\n    border-radius: 0.285714rem;\r\n    box-shadow: none;\r\n    color: #308330;\r\n}\r\n/* Success Placeholder */\r\n.ui.form .success ::-webkit-input-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success ::-ms-input-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success ::-moz-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success :focus::-webkit-input-placeholder {\r\n    color: #558e55;\r\n}\r\n.ui.form .success :focus::-ms-input-placeholder {\r\n    color: #558e55;\r\n}\r\n.ui.form .success :focus::-moz-placeholder {\r\n    color: #558e55;\r\n}\r\n"

/***/ }),

/***/ 705:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 706:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 707:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 708:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 709:
/***/ (function(module, exports) {

module.exports = ".column {\r\n  max-width: 450px;\r\n}\r\n\r\n/* Form Success Input */\r\n.ui.form .field.success label {\r\n    color: #308330;\r\n}\r\n.ui.form .field.success input {\r\n    background: #f4faf4 none repeat scroll 0 0;\r\n    border-color: #a3c293;\r\n    border-radius: 0.285714rem;\r\n    box-shadow: none;\r\n    color: #308330;\r\n}\r\n/* Success Placeholder */\r\n.ui.form .success ::-webkit-input-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success ::-ms-input-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success ::-moz-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success :focus::-webkit-input-placeholder {\r\n    color: #558e55;\r\n}\r\n.ui.form .success :focus::-ms-input-placeholder {\r\n    color: #558e55;\r\n}\r\n.ui.form .success :focus::-moz-placeholder {\r\n    color: #558e55;\r\n}\r\n"

/***/ }),

/***/ 710:
/***/ (function(module, exports) {

module.exports = ".main.menu{\r\n  background-color: #41c7f4;\r\n\r\n}\r\n\r\n.main.menu a{\r\n  font-weight: 700;\r\n}\r\n\r\na.header.item{\r\n  font-size: 1.5em;\r\n}\r\n"

/***/ }),

/***/ 711:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 712:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 713:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 714:
/***/ (function(module, exports) {

module.exports = ".column {\r\n  max-width: 450px;\r\n}\r\n\r\n/* Form Success Input */\r\n.ui.form .field.success label {\r\n    color: #308330;\r\n}\r\n.ui.form .field.success input {\r\n    background: #f4faf4 none repeat scroll 0 0;\r\n    border-color: #a3c293;\r\n    border-radius: 0.285714rem;\r\n    box-shadow: none;\r\n    color: #308330;\r\n}\r\n/* Success Placeholder */\r\n.ui.form .success ::-webkit-input-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success ::-ms-input-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success ::-moz-placeholder {\r\n    color: #5e9e5e;\r\n}\r\n.ui.form .success :focus::-webkit-input-placeholder {\r\n    color: #558e55;\r\n}\r\n.ui.form .success :focus::-ms-input-placeholder {\r\n    color: #558e55;\r\n}\r\n.ui.form .success :focus::-moz-placeholder {\r\n    color: #558e55;\r\n}\r\n"

/***/ }),

/***/ 716:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\r\n<div class=\"ui container\" style=\"padding-top: 15px;\">\r\n  <flash-messages></flash-messages>\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ 717:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui huge header\">My Makeup Blog</div>\n\n<div class=\"ui message\" [ngClass]=\"messageClass\">\n  <p>{{ message }}</p>\n</div>\n\n<div class=\"ui olive button\" *ngIf=\"isAdmin() && !newPost\" (click)=\"newBlogForm()\">New Post</div>\n\n<div *ngIf=\"newPost\">\n  <form class=\"ui form error success\" [formGroup]=\"form\" name=\"blogForm\" (submit)=\"onBlogSubmit()\">\n    <div class=\"ui segment\">\n      <div class=\"ui grid\">\n        <div class=\"ui medium rounded image four wide column\">\n          <img src=\"./images/defaultBlog.png\">\n          <input type=\"file\" class=\"ui button\" name=\"file\" ng2FileSelect [uploader]=\"uploader\">\n          <button type=\"button\" class=\"ui button\" (click)=\"uploader.uploadAll()\" [disabled]=\"uploader.isReady || uploader.isUploading || uploader.isSuccess\">\n            Upload\n          </button>\n        </div>\n        <div class=\"twelve wide column\">\n          <!-- Title Field -->\n          <div class=\"field\" [ngClass]=\"{'error': form.controls.title.dirty && form.controls.title.errors, 'success': form.controls.title.valid }\">\n            <label>Title</label>\n            <div class=\"ui left icon input\">\n              <i class=\"rocket icon\"></i>\n              <input type=\"text\" formControlName=\"title\" name=\"title\" placeholder=\"Title\">\n            </div>\n          </div>\n          <!-- Title Errors -->\n          <div class=\"ui error message\" *ngIf=\"form.controls.title.errors && form.controls.title.dirty\">\n            <div class=\"ui bulleted list\">\n              <div class=\"item\" *ngIf=\"form.controls.title.errors?.required\">This Field is Required</div>\n              <div class=\"item\" *ngIf=\"form.controls.title.errors?.minlength || form.controls.title.errors?.maxlength\">Min Length: 5, Max Length: 50</div>\n              <div class=\"item\" *ngIf=\"form.controls.title.errors?.alphaNumericValidation\">Must be a letter or number</div>\n            </div>\n          </div>\n          <!-- Body Field -->\n          <div class=\"field\" [ngClass]=\"{'error': form.controls.body.dirty && form.controls.body.errors, 'success': form.controls.body.valid }\">\n            <label>Body</label>\n            <textarea formControlName=\"body\" name=\"body\" rows=\"8\" cols=\"80\" placeholder=\"Body\"></textarea>\n          </div>\n          <!-- Body Errors -->\n          <div class=\"ui error message\" *ngIf=\"form.controls.body.errors && form.controls.body.dirty\">\n            <div class=\"ui bulleted list\">\n              <div class=\"item\" *ngIf=\"form.controls.body.errors?.required\">This Field is Required</div>\n              <div class=\"item\" *ngIf=\"form.controls.body.errors?.minlength || form.controls.body.errors?.maxlength\">Min Length: 5, Max Length: 500</div>\n            </div>\n          </div>\n          <button [disabled]=\"isProcessing\" class=\"ui orange button right floated\" (click)=\"goBack()\">Cancel</button>\n          <input [disabled]=\"isProcessing || !form.valid\" type=\"submit\" class=\"ui olive submit button right floated\" value=\"Submit Post\">\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n\n<!-- Show Posts -->\n<div class=\"ui top segment\">\n    <div class=\"ui divided items\">\n        <div *ngFor=\"let blog of blogPosts\" class=\"item\">\n            <div class=\"ui small image\">\n                <img src={{blog.image}} alt=\"Picture that was Uploaded\">\n            </div>\n            <div class=\"content\">\n                <a class=\"header\" href=\"#\">{{ blog.title }}</a>\n                <div class=\"meta\">\n                    <span>{{ blog.createdAt | date: 'MMM dd, yyyy' }}</span>\n                    <span class=\"ui right floated\">Posted By - {{ blog.createdBy }}</span>\n                </div>\n                <div class=\"description\">\n                    <p>{{ blog.body }}</p>\n                </div>\n                <div class=\"extra\">\n                  <!-- Like Button -->\n                  <div class=\"ui labeled like button\" tabindex=\"0\" (click)=\"likeBlog(blog._id)\">\n                    <div class=\"ui red button\">\n                      <i class=\"thumbs up icon\"></i> Like\n                    </div>\n                    <a class=\"ui basic red left pointing label\">\n                      {{ blog.likes }}\n                    </a>\n                  </div>\n                  <div class=\"ui like popup\" >\n                    <div class=\"ui selection list\">\n                      <div class=\"item\" *ngFor=\"let liker of blog.likedBy\">\n                        <div class=\"header\" [routerLink]=\"['/user/', liker]\">{{ liker }}</div>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- Dislike Button -->\n                  <div  class=\"ui left labeled dislike button\" tabindex=\"0\" (click)=\"dislikeBlog(blog._id)\">\n                    <a class=\"ui basic blue right pointing label\">\n                      {{ blog.dislikes }}\n                    </a>\n                    <div class=\"ui blue button\">\n                      <i class=\"thumbs down icon\"></i> Dislike\n                    </div>\n                  </div>\n                  <div class=\"ui popup\">\n                    <div class=\"ui selection list\">\n                      <div class=\"item\" *ngFor=\"let disliker of blog.dislikedBy\">\n                        <div class=\"header\" [routerLink]=\"['/user/', disliker]\">{{ disliker }}</div>\n                      </div>\n                    </div>\n                  </div>\n                  <button class=\"ui mini red right floated button\" *ngIf=\"isAdmin()\" [routerLink]=\"['/delete-blog/', blog._id]\">Delete</button>\n                  <button class=\"ui mini yellow right floated button\" *ngIf=\"isAdmin()\" [routerLink]=\"['/edit-blog/', blog._id]\">Edit</button>\n                  <button [disabled]=\"newComment.indexOf(blog._id) > -1\" class=\"ui yellow right floated button\" *ngIf=\"authService.loggedIn()\" (click)=\"draftComment(blog._id)\" >\n                    <i class=\"comment icon\"></i>&nbsp;&nbsp;Post Comment\n                  </button>\n                </div> <!-- End extra -->\n                <div *ngIf=\"newComment.indexOf(blog._id) > -1\">\n                  <form class=\"ui form error success\" [formGroup]=\"commentForm\">\n                    <div class=\"field\" [ngClass]=\"{'error': commentForm.controls.comment.errors && commentForm.controls.comment.dirty, 'success': !commentForm.controls.comment.errors}\">\n                      <textarea formControlName=\"comment\" name=\"comment\" rows=\"10\" cols=\"30\"></textarea>\n                      <div class=\"ui error message\" *ngIf=\"commentForm.controls.comment.errors && commentForm.controls.comment.dirty\">\n                        <div class=\"ui bulleted list\">\n                          <div class=\"item\" *ngIf=\"commentForm.controls.comment.errors?.required\">This Field is Required</div>\n                          <div class=\"item\" *ngIf=\"commentForm.controls.comment.errors?.minlength || commentForm.controls.comment.errors?.maxlength\">Comment must be less than 200 characters</div>\n                        </div>\n                      </div>\n                    </div>\n                    <button [disabled]=\"!commentForm.valid || isProcessing\" class=\"ui blue labeled submit icon button\" type=\"submit\" (click)=\"postComment(blog._id)\">\n                      <i class=\"icon edit\"></i> Submit Comment\n                    </button>\n                    <button [disabled]=\"isProcessing\" class=\"ui orange labeled icon button\" (click)=\"cancelSubmission(blog._id)\">\n                      <i class=\"icon edit\"></i> Cancel\n                    </button>\n                  </form>\n                </div>\n                <div *ngIf=\"enabledComments.indexOf(blog._id) === -1 && blog.comments.length > 0\">\n                  <br />\n                  <span class=\"ui small purple button\" (click)=\"expand(blog._id)\">\n                    Read Comments&nbsp;&nbsp;\n                    <i class=\"icon comments\"></i>\n                  </span>\n                </div>\n                <div *ngIf=\"enabledComments.indexOf(blog._id) > -1\">\n                  <br />\n                  <span class=\"ui small purple button\" (click)=\"collapse(blog._id)\">\n                    Hide Comments&nbsp;&nbsp;\n                    <i class=\"icon comments\"></i>\n                  </span>\n                </div>\n                <!-- Start Comments -->\n                <div class=\"ui small minimal comments segment\" *ngIf=\"enabledComments.indexOf(blog._id) > -1\">\n                  <h3 class=\"ui dividing header\">Comments</h3>\n                  <div class=\"comment\" *ngFor=\"let comment of blog.comments\">\n                    <a class=\"avatar\">\n                      <img src={{comment.image}}>\n                    </a>\n                    <div class=\"content\">\n                      <a class=\"author\">{{ comment.commentator }}</a>\n                      <div class=\"metadata\">\n                        <span class=\"date\">{{ comment.createdAt | date: 'MMM dd, yyyy' }}</span>\n                      </div>\n                      <div class=\"text\">\n                        {{  comment.comment }}\n                      </div>\n                    </div>\n                  </div>\n                </div> <!-- End Comments -->\n            </div> <!-- End content -->\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 718:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui huge header\">Delete Blog</div>\n\n<div class=\"ui message\" [ngClass]=\"messageClass\">\n  <p>{{ message }}</p>\n</div>\n\n<div *ngIf=\"foundBlog\">\n  <div class=\"ui segment\">\n    <div class=\"ui divided items\">\n      <div class=\"item\">\n        <div class=\"image\">\n            <img src={{blog.image}}>\n        </div>\n        <div class=\"content\">\n          <a class=\"header\" href=\"#\">{{ blog.title }}</a>\n          <div class=\"meta\">\n            <span>{{ blog.createdAt | date: 'MMM dd, yyyy' }}</span>\n            <span class=\"ui right floated\">Posted By - {{ blog.createdBy }}</span>\n          </div>\n          <div class=\"description\">\n            <p>{{ blog.body }}</p>\n          </div>\n        </div> <!-- End content -->\n      </div>\n    </div>\n  </div>\n  <div class=\"ui red raised segment\">\n    <div class=\"ui divided items\">\n      <div class=\"item\">\n        <div class=\"content\">\n          <div class=\"header\">Confirm</div>\n          <div class=\"description\">\n            <p>Are you sure you would like to delete this blog?</p>\n          </div>\n          <div class=\"extra\">\n            <button [disabled]=\"isProcessing\" class=\"ui red button\" (click)=\"deleteBlog()\">Yes</button>\n            <button [disabled]=\"isProcessing\" class=\"ui green button\" routerLink=\"/blog\">No</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 719:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui huge header\">Edit Blog</div>\n\n<div class=\"ui message\" [ngClass]=\"messageClass\">\n  <p>{{ message }}</p>\n</div>\n\n<form class=\"ui form\" (submit)=\"updateBlogSubmit()\" *ngIf=\"!isLoading\">\n  <div class=\"ui segment\">\n    <div class=\"ui grid\">\n      <div class=\"ui medium rounded image four wide column\">\n        <img src={{blog.image}}>\n        <input type=\"file\" class=\"ui button\" name=\"file\" ng2FileSelect [uploader]=\"uploader\">\n        <button type=\"button\" class=\"ui button\" (click)=\"uploader.uploadAll()\" [disabled]=\"uploader.isReady || uploader.isUploading || uploader.isSuccess\">\n          Upload\n        </button>\n      </div>\n      <div class=\"twelve wide column\">\n        <!-- Title Field -->\n        <div class=\"field\">\n          <label for=\"title\">Title</label>\n          <div class=\"ui left icon input\">\n            <i class=\"rocket icon\"></i>\n            <input [disabled]=\"isProcessing\" type=\"text\" [(ngModel)]=\"blog.title\" name=\"title\" placeholder=\"Title\">\n          </div>\n        </div>\n        <!-- Body Field -->\n        <div class=\"field\">\n          <label for=\"body\">Body</label>\n          <textarea [disabled]=\"isProcessing\" [(ngModel)]=\"blog.body\" name=\"body\" rows=\"8\" cols=\"80\" placeholder=\"Body\"></textarea>\n        </div>\n        <button [disabled]=\"isProcessing\" class=\"ui red button\" [routerLink]=\"['/delete-blog/', blog._id]\">Delete</button>\n        <button [disabled]=\"isProcessing\" class=\"ui orange button\" (click)=\"goBack()\">Cancel</button>\n        <input [disabled]=\"isProcessing\" type=\"submit\" class=\"ui olive submit button\" value=\"Save Changes\">\n      </div>\n    </div>\n  </div>\n</form>\n\n<button [disabled]=\"isProcessing\" class=\"ui orange button\" (click)=\"goBack()\" *ngIf=\"isLoading\">Cancel</button>\n"

/***/ }),

/***/ 720:
/***/ (function(module, exports) {

module.exports = "<p>\n  dashboard works!\n</p>\n"

/***/ }),

/***/ 721:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui message\">\n  <div class=\"ui header center aligned\" style=\"font-size: 4em;\">\n    Makeup Space\n  </div>\n  <p class=\"ui center aligned grid\" style=\"font-size: 1.3em;\">\n    The only place to find the best prices on any Products and where to find them. You will be able to make a list of your favorite products\n    and keep tabs on the cheapest place to buy them. You will also be able to see how other people rate them and what they may say is better.\n  </p>\n  <div class=\"ui center aligned grid\">\n    <a class=\"ui pink button\" *ngIf=\"!authService.loggedIn()\" routerLink=\"/login\">Login</a>\n    <a class=\"ui blue button\" *ngIf=\"!authService.loggedIn()\"routerLink=\"/register\">Register</a>\n    <a class=\"ui blue button\" *ngIf=\"authService.loggedIn()\"routerLink=\"/blog\">View Blog</a>\n  </div>\n</div>\n\n<div class=\"ui stackable three column grid\">\n  <div class=\"column\">\n    <div class=\"ui header\"><i class=\"money icon\"></i> Prices and Location</div>\n    <p>Find the best prices on the makeup products you love and find where to buy them</p>\n  </div>\n  <div class=\"column\">\n    <div class=\"ui header\"><i class=\"comments icon\"></i> Reviews</div>\n    <p>Users will be able to rate and comment on the different products that are found and listed here to see if the price is really worth it.</p>\n  </div>\n  <div class=\"column\">\n    <div class=\"ui header\"><i class=\"sort alphabet ascending icon\"></i>Your Own List</div>\n    <p>Keep a list of your favorite products and know exactly where to buy them for the cheapest price.</p>\n  </div>\n</div>\n"

/***/ }),

/***/ 722:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui message\" [ngClass]=\"messageClass\">\n  <p>{{ message }}</p>\n</div>\n\n<div class=\"ui middle aligned center aligned grid\">\n  <div class=\"column\">\n    <h2 class=\"ui teal dividing header\">\n      <div class=\"content\">\n        Sign Up Here\n      </div>\n    </h2>\n    <!-- Start Form -->\n    <form class=\"ui large form error success\" [formGroup]=\"form\" (submit)=\"onLoginSubmit()\">\n      <div class=\"ui stacked segment\">\n        <!-- Username Field -->\n        <div class=\"field\" [ngClass]=\"{'error': form.controls.username.errors && form.controls.username.dirty, 'success': form.controls.username.valid && form.controls.username.dirty}\">\n          <div class=\"ui left icon input\">\n            <i class=\"user icon\"></i>\n            <input type=\"text\" formControlName=\"username\" name=\"username\" placeholder=\"Username\">\n          </div>\n        </div>\n        <!-- Username Errors -->\n        <div class=\"ui error message\" *ngIf=\"form.controls.username.errors && form.controls.username.dirty\">\n          <div class=\"ui bulleted list\">\n            <div class=\"item\" *ngIf=\"form.controls.username.errors?.required\">This Field is Required</div>\n          </div>\n        </div>\n        <!-- Password Field -->\n        <div class=\"field\" [ngClass]=\"{'error': form.controls.password.errors && form.controls.password.dirty, 'success': form.controls.password.valid && form.controls.password.dirty}\">\n          <div class=\"ui left icon input\">\n            <i class=\"lock icon\"></i>\n            <input type=\"password\" formControlName=\"password\" name=\"password\" placeholder=\"Password\">\n          </div>\n        </div>\n        <!-- Password Errors -->\n        <div class=\"ui error message\" *ngIf=\"form.controls.password.errors && form.controls.password.dirty\">\n          <div class=\"ui bulleted list\">\n            <div class=\"item\" *ngIf=\"form.controls.password.errors?.required\">This Field is Required</div>\n          </div>\n        </div>\n        <!-- Submit Button -->\n        <input [disabled]=\"!form.valid || isProcessing\" type=\"submit\" class=\"ui fluid large teal submit button\" value=\"Login\">\n      </div>\n    </form>\n    <div class=\"ui message\">\n      New to us? <a routerLink=\"/register\">Sign Up</a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 723:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui main borderless menu\">\n  <div class=\"ui container\">\n  <a class=\"header item\" routerLink=\"/\" >Makeup</a>\n  <a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\" routerLink=\"/\">Home</a>\n  <a class=\"product item\">\n    Face\n    <i class=\"dropdown icon\"></i>\n  </a>\n  <div class=\"ui flowing popup transition hidden\">\n    <div class=\"ui three column relaxed equal height divided grid\">\n      <div class=\"column\">\n        <a class=\"ui small header\">Eyes</a>\n        <div class=\"ui link list\">\n          <a class=\"item\">Eyeshadow</a>\n          <a class=\"item\">Mascara</a>\n          <a class=\"item\">Eyebrows</a>\n          <a class=\"item\">Eyelashes</a>\n        </div>\n      </div>\n      <div class=\"column\">\n        <a class=\"ui small header\">Cheeks</a>\n        <div class=\"ui link list\">\n          <a class=\"item\">Blush</a>\n          <a class=\"item\">Face Powder</a>\n          <a class=\"item\">Large</a>\n          <a class=\"item\">Plus Sizes</a>\n        </div>\n      </div>\n      <div class=\"column\">\n        <h4 class=\"ui header\">Lips</h4>\n        <div class=\"ui link list\">\n          <a class=\"item\">Neutrals</a>\n          <a class=\"item\">Brights</a>\n          <a class=\"item\">Pastels</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"right menu\">\n    <div class=\"item\">\n      <div class=\"ui action left icon input\">\n        <i class=\"search icon\"></i>\n        <input type=\"text\" placeholder=\"Search for Products\">\n        <button class=\"ui button\">Submit</button>\n      </div>\n    </div>\n    <a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\" routerLink=\"/blog\">Blog</a>\n    <!-- testing user dropdown -->\n    <a class=\"user item\" *ngIf=\"authService.loggedIn() && isLoading\">\n      <img src={{user.image}} alt=\"\" class=\"ui avatar image\">\n      {{ user.username }}\n      <i class=\"dropdown icon\"></i>\n    </a>\n    <div class=\"ui popup transition hidden\" *ngIf=\"authService.loggedIn() && isLoading\">\n      <div class=\"ui secondary vertical menu\">\n        <a class=\"item\" routerLink=\"/profile\">My Profile</a>\n        <a class=\"item\" routerLink=\"/dashboard\">Dashboard</a>\n        <div class=\"ui divider\"></div>\n        <a class=\"item\" (click)=\"onLogoutClick()\">Logout</a>\n      </div>\n    </div>\n    <!-- <a class=\"item\" *ngIf=\"authService.loggedIn()\"(click)=\"onLogoutClick()\">Logout</a> -->\n    <div class=\"item\" *ngIf=\"!authService.loggedIn()\">\n      <div class=\"ui pink button\" routerLink=\"/login\">Login</div>\n    </div>\n    <div class=\"item\" *ngIf=\"!authService.loggedIn()\">\n      <div class=\"ui blue button\" routerLink=\"/register\">Sign Up</div>\n    </div>\n  </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 724:
/***/ (function(module, exports) {

module.exports = "<p>\n  products works!\n</p>\n"

/***/ }),

/***/ 725:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui huge dividing header\">\n  Your Profile\n</div>\n\n<div class=\"ui message\" [ngClass]=\"messageClass\">\n  <p>{{ message }}</p>\n</div>\n\n<div class=\"ui divided items\" *ngIf=\"!editMode && !isLoading\">\n  <div class=\"item\">\n    <div class=\"content\">\n      <div class=\"ui grid\">\n        <div class=\"ui medium rounded image four wide column\">\n          <img src={{user.image}} alt=\"User Picture Here\">\n        </div>\n        <div class=\"twelve wide column\">\n          <div class=\"ui header\">\n            {{ user.username }} - {{ user.email }}\n            <button class=\"ui secondary right floated mini button\" (click)=\"enableEditMode()\"><i class=\"edit icon\"></i>&nbsp;Edit</button>\n          </div>\n          <div class=\"meta\">\n            <div class=\"cinema\">About Me - This will display on your Public Profile</div>\n          </div>\n          <div class=\"description\">\n            <p>{{ user.aboutMe }}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"ui divided items\" *ngIf=\"editMode\">\n  <div class=\"item\">\n    <div class=\"content\">\n      <div class=\"ui grid\">\n        <div class=\"ui medium rounded image four wide column\">\n          <img src={{user.image}} alt=\"User Picture Here\">\n          <input type=\"file\" name=\"file\" ng2FileSelect [uploader]=\"uploader\">\n          <button type=\"button\" class=\"ui button\" (click)=\"uploader.uploadAll()\" [disabled]=\"uploader.isReady || uploader.isUploading || uploader.isSuccess\">\n            Upload\n          </button>\n        </div>\n        <div class=\"twelve wide column\">\n          <div class=\"ui header\">\n            {{ user.username }} - {{ user.email }}\n            <button [disabled]=\"isProcessing\" class=\"ui green right floated mini button\" (click)=\"updateUserSubmit()\"><i class=\"checkmark icon\"></i>&nbsp;Save</button>\n          </div>\n          <div class=\"meta\">\n            <div class=\"cinema\">About Me - This will display on your Public Profile\n              <button [disabled]=\"isProcessing\" class=\"ui orange right floated mini button\" (click)=\"cancelEdit()\">Cancel</button>\n            </div>\n          </div>\n          <div class=\"description\">\n            <div class=\"ui input\">\n              <textarea [disabled]=\"isProcessing\" type=\"text\" [(ngModel)]=\"user.aboutMe\" name=\"aboutMe\" rows=\"8\" cols=\"80\" placeholder=\"About Me\"></textarea>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 726:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui huge dividing header\">{{ currentUrl.username }}</div>\n\n<div class=\"ui message\" [ngClass]=\"messageClass\">\n  <p>{{ message }}</p>\n</div>\n\n<div *ngIf=\"foundProfile\">\n  <div class=\"ui divided items\">\n    <div class=\"item\">\n      <div class=\"content\">\n        <div class=\"ui grid\">\n          <div class=\"ui medium rounded image four wide column\">\n            <img src={{user.image}} alt=\"User Picture Here\">\n          </div>\n          <div class=\"twelve wide column\">\n            <div class=\"ui header\">\n              {{ user.username }}\n            </div>\n            <div class=\"meta\">\n              <div class=\"cinema\">About Me</div>\n            </div>\n            <div class=\"description\">\n              <p>{{ user.aboutMe }}</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"item\">\n      <div class=\"content\">\n        <div class=\"header\">\n          Liked Items\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 727:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui message\" [ngClass]=\"messageClass\">\n  <p>{{ message }}</p>\n</div>\n\n<div class=\"ui middle aligned center aligned grid\">\n  <div class=\"column\">\n    <h2 class=\"ui teal dividing header\">\n      <div class=\"content\">\n        Sign Up Here\n      </div>\n    </h2>\n    <!-- Start Form -->\n    <form class=\"ui large form error success\" [formGroup]=\"form\" (submit)=\"onRegisterSubmit()\">\n      <div class=\"ui stacked segment\">\n        <!-- Username Field -->\n        <div class=\"field\" [ngClass]=\"{'error': (form.controls.username.errors && form.controls.username.dirty) || (!isUsernameValid && form.controls.username.dirty),\n        'success': !form.controls.username.errors && isUsernameValid}\">\n          <div class=\"ui left icon input\">\n            <i class=\"user icon\"></i>\n            <input type=\"text\" formControlName=\"username\" name=\"username\" placeholder=\"Username\" (blur)=\"checkUsername()\">\n          </div>\n        </div>\n        <!-- Username Errors -->\n        <div class=\"ui error message\" *ngIf=\"(form.controls.username.errors || !isUsernameValid) && form.controls.username.dirty\">\n          <div class=\"ui bulleted list\">\n            <div class=\"item\" *ngIf=\"form.controls.username.errors?.required \">This Field is Required</div>\n            <div class=\"item\" *ngIf=\"form.controls.username.errors?.minlength || form.controls.username.errors?.maxlength\">Minimum Characters: 3, Maximum Characters: 15</div>\n            <div class=\"item\" *ngIf=\"form.controls.username.errors?.validateUsername\">Usernames can only contain letters and numbers</div>\n            <div class=\"item\" *ngIf=\"usernameMessage\">{{ usernameMessage }}</div>\n          </div>\n        </div>\n        <!-- Email Field -->\n        <div class=\"field\" [ngClass]=\"{'error': (form.controls.email.errors && form.controls.email.dirty) || (!isEmailValid && form.controls.email.dirty),\n        'success': !form.controls.email.errors && isEmailValid}\">\n          <div class=\"ui left icon input\">\n            <i class=\"mail icon\"></i>\n            <input type=\"text\" formControlName=\"email\" name=\"email\" placeholder=\"E-mail address\" (blur)=\"checkEmail()\">\n          </div>\n        </div>\n        <!-- Email Errors -->\n        <div class=\"ui error message\" *ngIf=\"(form.controls.email.errors || !isEmailValid) && form.controls.email.dirty\">\n          <div class=\"ui bulleted list\">\n            <div class=\"item\" *ngIf=\"form.controls.email.errors?.required\">This Field is Required</div>\n            <div class=\"item\" *ngIf=\"form.controls.email.errors?.minlength || form.controls.email.errors?.maxlength\">Minimum Characters: 5, Maximum Characters: 30</div>\n            <div class=\"item\" *ngIf=\"form.controls.email.errors?.validateEmail\">This must be a valid Email Address</div>\n            <div class=\"item\" *ngIf=\"emailMessage\">{{ emailMessage }}</div>\n          </div>\n        </div>\n        <!-- Password Field -->\n        <div class=\"field\" [ngClass]=\"{'error': (form.controls.password.errors && form.controls.password.dirty), 'success': !form.controls.password.errors}\">\n          <div class=\"ui left icon input\">\n            <i class=\"lock icon\"></i>\n            <input type=\"password\" formControlName=\"password\" name=\"password\" placeholder=\"Password\">\n          </div>\n        </div>\n        <!-- Password Errors -->\n        <div class=\"ui error message\" *ngIf=\"form.controls.password.errors && form.controls.password.dirty\">\n          <div class=\"ui bulleted list\">\n            <div class=\"item\" *ngIf=\"form.controls.password.errors?.required\">This Field is Required</div>\n            <div class=\"item\" *ngIf=\"form.controls.password.errors?.minlength || form.controls.password.errors?.maxlength\">Minimum Characters: 8, Maximum Characters: 35</div>\n            <div class=\"item\" *ngIf=\"form.controls.password.errors?.validatePassword\">Passwords must have at least one uppercase, lowercase, special character, and a number</div>\n          </div>\n        </div>\n        <!-- Confirm Field -->\n        <div class=\"field\" [ngClass]=\"{'error': (form.controls.confirm.errors && form.controls.confirm.dirty) ||\n          (form.errors?.matchingPasswords && form.controls.confirm.dirty), 'success': !form.controls.confirm.errors && !form.errors?.matchingPasswords}\">\n          <div class=\"ui left icon input\">\n            <i class=\"lock icon\"></i>\n            <input type=\"password\" formControlName=\"confirm\" name=\"confirm\" placeholder=\"Confirm Password\">\n          </div>\n        </div>\n        <!-- Confirm Errors -->\n        <div class=\"ui error message\" *ngIf=\"(form.controls.confirm.errors && form.controls.confirm.dirty) || (form.errors?.matchingPasswords && form.controls.confirm.dirty)\">\n          <div class=\"ui bulleted list\">\n            <div class=\"item\" *ngIf=\"form.controls.confirm.errors?.required\">This Field is Required</div>\n            <div class=\"item\" *ngIf=\"form.errors?.matchingPasswords\">Passwords must match!</div>\n          </div>\n        </div>\n        <!-- Submit Button -->\n        <input [disabled]=\"!form.valid || isProcessing || !isEmailValid || !isUsernameValid\" type=\"submit\" class=\"ui fluid large teal submit button\" value=\"Sign Up\">\n      </div>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(415);


/***/ })

},[753]);
//# sourceMappingURL=main.bundle.map