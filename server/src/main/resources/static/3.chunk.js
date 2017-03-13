webpackJsonp([3,8],{

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_component__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(379);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var REGISTER_ROUTE = [
    { path: "", component: __WEBPACK_IMPORTED_MODULE_3__register_component__["a" /* RegisterComponent */] },
    { path: "*", redirectTo: "", pathMatch: "full" }
];
var RegisterModule = (function () {
    function RegisterModule() {
    }
    RegisterModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(REGISTER_ROUTE),
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* ReactiveFormsModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__register_component__["a" /* RegisterComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RegisterModule);
    return RegisterModule;
}());
//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_auth_service__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
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
    function RegisterComponent(router, fb, authService) {
        this.router = router;
        this.fb = fb;
        this.authService = authService;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.fb.group({
            email: ["",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].composeAsync([
                    this.isEmailTaken.bind(this)
                ])],
            password: this.fb.group({
                password1: ["",
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
                        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
                        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(6),
                        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(15)
                    ])],
                password2: [""]
            }, { validator: this.comparePasswords }),
            firstname: ["",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(25)
                ])],
            lastname: ["",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(25)
                ])]
        });
    };
    RegisterComponent.prototype.onSignup = function () {
        var _this = this;
        if (this.registerForm.invalid) {
            alert("Invalid Form Values");
            return;
        }
        var account = this.registerForm.value;
        account.firstname = account.firstname.slice(0, 1).toUpperCase() + account.firstname.toLowerCase().slice(1, account.firstname.length);
        account.lastname = account.lastname.slice(0, 1).toUpperCase() + account.lastname.toLowerCase().slice(1, account.lastname.length);
        var password = account.password.password1;
        var confirmedPassword = account.password.password2;
        account.password = password;
        account.confirmedPassword = confirmedPassword;
        this.authService.signUp(account)
            .toPromise()
            .then(function (data) {
            console.log(data);
            if (data.result == true) {
                _this.router.navigateByUrl("/auth/login");
            }
            else {
                alert("Signup Failed!");
            }
        });
    };
    RegisterComponent.prototype.comparePasswords = function (c) {
        return c.get("password1").value == c.get("password2").value ? null : { samePassword: true };
    };
    RegisterComponent.prototype.isEmailTaken = function (c) {
        return this.authService.isEmailTaken(c.value)
            .toPromise()
            .then(function (data) {
            if (data.result == true) {
                return { "isTaken": true };
            }
            else {
                return null;
            }
        });
    };
    RegisterComponent.prototype.getEmailError = function () {
        var email = this.registerForm.get("email");
        if (email.valid)
            return " ";
        if (email.hasError("pattern")) {
            return "Invalid email address";
        }
        if (email.hasError("isTaken")) {
            return "This email is already taken";
        }
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-register',
            template: __webpack_require__(869),
            styles: [__webpack_require__(857)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__service_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(65)();
// imports


// module
exports.push([module.i, ".register-container {\n  width: 100%;\n  max-width: 400px;\n  margin: auto;\n  border: 2px grey solid;\n  border-radius: 5px; }\n  .register-container .register-title-container {\n    width: 100%;\n    max-width: 200px;\n    margin: auto; }\n  .register-container form {\n    width: 100%; }\n    .register-container form table {\n      width: 100%;\n      max-width: 300px;\n      margin: 0 auto 10px; }\n      .register-container form table tr td {\n        padding: 0;\n        empty-cells: show; }\n      .register-container form table tr.col-span-1 td {\n        padding: 0 5px; }\n        .register-container form table tr.col-span-1 td:first-child {\n          padding-left: 0; }\n        .register-container form table tr.col-span-1 td:last-child {\n          padding-right: 0; }\n    .register-container form input {\n      height: 25px;\n      width: 100%;\n      text-indent: 8px; }\n  .register-container .btn-register-container {\n    text-align: center;\n    margin: 15px auto;\n    max-width: 300px; }\n    .register-container .btn-register-container button {\n      width: 100%;\n      height: 30px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 869:
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n  <div class=\"register-container\">\r\n    <div class=\"register-title-container\">\r\n      <img src=\"/assets/images/signup.svg\" alt=\"sign up\">\r\n    </div>\r\n\r\n    <form (ngSubmit)=\"onSignup()\" [formGroup]=\"registerForm\">\r\n      <table>\r\n        <tr>\r\n          <td colspan=\"2\"><label for=\"register-email\">Email:</label></td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"2\">\r\n            <input type=\"text\"\r\n                   id=\"register-email\"\r\n                   formControlName=\"email\"\r\n                   placeholder=\"Example: abc@abc.com\"\r\n                   autocomplete=\"off\">\r\n          </td>\r\n        </tr>\r\n        <tr class=\"form-validator\">\r\n          <td colspan=\"2\">{{getEmailError()}} &nbsp;</td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td colspan=\"2\"><label for=\"password1\">Password:</label></td>\r\n        </tr>\r\n        <tr formGroupName=\"password\">\r\n          <td colspan=\"2\">\r\n            <input type=\"password\"\r\n                   id=\"password1\"\r\n                   formControlName=\"password1\"\r\n                   placeholder=\"6-15 characters\">\r\n          </td>\r\n        </tr>\r\n        <tr class=\"form-validator\">\r\n          <td colspan=\"2\"\r\n              *ngIf=\"registerForm.get('password').get('password1').invalid&&registerForm.get('password').get('password1').touched\">\r\n            Invalid password\r\n          </td>\r\n          <td colspan=\"2\"\r\n              *ngIf=\"registerForm.get('password').get('password1').valid||!registerForm.get('password').get('password1').touched\">\r\n            &nbsp;</td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td colspan=\"2\"><label for=\"password2\">Confirm Password:</label></td>\r\n        </tr>\r\n        <tr formGroupName=\"password\">\r\n          <td colspan=\"2\">\r\n            <input type=\"password\"\r\n                   id=\"password2\"\r\n                   formControlName=\"password2\"\r\n                   placeholder=\"Enter password again\">\r\n          </td>\r\n        </tr>\r\n        <tr class=\"form-validator\">\r\n          <td colspan=\"2\"\r\n              *ngIf=\"registerForm.get('password').hasError('samePassword')&&registerForm.get('password').get('password2').touched\">\r\n            Two passwords do not match\r\n          </td>\r\n          <td colspan=\"2\"\r\n              *ngIf=\"!registerForm.get('password').hasError('samePassword')||!registerForm.get('password').get('password2').touched\">\r\n            &nbsp;</td>\r\n        </tr>\r\n\r\n        <tr class=\"col-span-1\">\r\n          <td><label for=\"register-firstname\">First Name:</label></td>\r\n          <td><label for=\"register-lastname\">Last Name:</label></td>\r\n        </tr>\r\n        <tr class=\"col-span-1\">\r\n          <td>\r\n            <input type=\"text\"\r\n                   id=\"register-firstname\"\r\n                   formControlName=\"firstname\"\r\n                   placeholder=\"1-25 characters\"\r\n                   autocomplete=\"off\">\r\n          </td>\r\n          <td>\r\n            <input type=\"text\"\r\n                   id=\"register-lastname\"\r\n                   formControlName=\"lastname\"\r\n                   placeholder=\"1-25 characters\"\r\n                   autocomplete=\"off\">\r\n          </td>\r\n        </tr>\r\n        <tr class=\"form-validator\">\r\n          <td *ngIf=\"registerForm.get('firstname').invalid&&registerForm.get('firstname').touched\">Invalid First Name\r\n          </td>\r\n          <td *ngIf=\"registerForm.get('firstname').valid||!registerForm.get('firstname').touched\">&nbsp;</td>\r\n          <td *ngIf=\"registerForm.get('lastname').invalid&&registerForm.get('lastname').touched\">Invalid Last Name</td>\r\n          <td *ngIf=\"registerForm.get('lastname').valid||!registerForm.get('lastname').touched\">&nbsp;</td>\r\n        </tr>\r\n\r\n        <tr>\r\n\r\n        </tr>\r\n        <tr>\r\n\r\n        </tr>\r\n\r\n        <!--<tr>-->\r\n        <!--<td><label for=\"register-street\">Street:</label></td>-->\r\n        <!--<td><input type=\"text\"-->\r\n        <!--id=\"register-street\"-->\r\n        <!--formControlName=\"street\"></td>-->\r\n        <!--</tr>-->\r\n\r\n        <!--<tr>-->\r\n        <!--<td><label for=\"register-suite\">Suite:</label></td>-->\r\n        <!--<td><input type=\"text\"-->\r\n        <!--id=\"register-suite\"-->\r\n        <!--formControlName=\"suite\"></td>-->\r\n        <!--</tr>-->\r\n\r\n        <!--<tr>-->\r\n        <!--<td><label for=\"register-city\">City:</label></td>-->\r\n        <!--<td><input type=\"text\"-->\r\n        <!--id=\"register-city\"-->\r\n        <!--formControlName=\"city\"></td>-->\r\n        <!--</tr>-->\r\n\r\n        <!--<tr>-->\r\n        <!--<td><label for=\"register-state\">State:</label></td>-->\r\n        <!--<td>-->\r\n        <!--<select id=\"register-state\"-->\r\n        <!--formControlName=\"state\">-->\r\n        <!--<option value=\"VA\">VA</option>-->\r\n        <!--<option value=\"PA\">PA</option>-->\r\n        <!--<option value=\"NY\">NY</option>-->\r\n        <!--</select>-->\r\n        <!--</td>-->\r\n        <!--</tr>-->\r\n\r\n        <!--<tr>-->\r\n        <!--<td><label for=\"register-zip\">Zip Code:</label></td>-->\r\n        <!--<td><input type=\"text\"-->\r\n        <!--id=\"register-zip\"-->\r\n        <!--formControlName=\"zipcode\"></td>-->\r\n        <!--</tr>-->\r\n      </table>\r\n      <div class=\"btn-register-container\">\r\n        <button type=\"submit\"\r\n                id=\"btn-register\"\r\n                [disabled]=\"registerForm.invalid||registerForm.pending\">Sign Up\r\n        </button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ })

});
//# sourceMappingURL=3.chunk.js.map