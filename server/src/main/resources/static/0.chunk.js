webpackJsonp([0,8],{

/***/ 831:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_list_order_list_component__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile_component__ = __webpack_require__(840);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__address_book_address_book_component__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__payment_book_payment_book_component__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__account_route__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__address_book_address_component__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__profile_profile_update_profile_update_component__ = __webpack_require__(839);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountModule", function() { return AccountModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AccountModule = (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_8__account_route__["a" /* ACCOUNT_ROUTE */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__order_list_order_list_component__["a" /* OrderListComponent */], __WEBPACK_IMPORTED_MODULE_3__profile_profile_component__["a" /* ProfileComponent */], __WEBPACK_IMPORTED_MODULE_4__address_book_address_book_component__["a" /* AddressBookComponent */], __WEBPACK_IMPORTED_MODULE_5__payment_book_payment_book_component__["a" /* PaymentBookComponent */], __WEBPACK_IMPORTED_MODULE_9__address_book_address_component__["a" /* AddressComponent */], __WEBPACK_IMPORTED_MODULE_10__profile_profile_update_profile_update_component__["a" /* ProfileUpdateComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AccountModule);
    return AccountModule;
}());
//# sourceMappingURL=account.module.js.map

/***/ }),

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_profile_service__ = __webpack_require__(380);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressBookComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddressBookComponent = (function () {
    function AddressBookComponent(router, profileService) {
        this.router = router;
        this.profileService = profileService;
        this.addresses = [];
    }
    AddressBookComponent.prototype.ngOnInit = function () {
        // for (let i = 0; i < 5; i++) {
        //   const address: Address = {
        //     city: "Manassas",
        //     street: "10529 Crestwood Dr",
        //     suite: "203",
        //     state: "VA",
        //     stateID: 1,
        //     tag: "Office",
        //     isPrimary: i == 2,
        //     id: i,
        //     zipcode: 20155
        //   };
        //   this.addresses.push(address);
        // }
        var _this = this;
        for (var _i = 0, _a = this.addresses; _i < _a.length; _i++) {
            var address = _a[_i];
            if (address.isPrimary) {
                var first = this.addresses.splice(0, this.addresses.indexOf(address));
                var last = this.addresses.splice(this.addresses.indexOf(address) + 1, this.addresses.length);
                this.addresses = [address].concat(first).concat(last);
                break;
            }
        }
        this.profileService.getCurrentAddresses()
            .toPromise()
            .then(function (data) {
            console.log(data.object);
            var object = data.object;
            _this.addresses = object;
        });
    };
    AddressBookComponent.prototype.onEdit = function (params) {
        if (params == null) {
            this.router.navigateByUrl("/auth/account/update_address");
        }
        else {
            this.router.navigate(["/auth/account/update_address", params]);
        }
    };
    AddressBookComponent.prototype.onDelete = function (value) {
        this.profileService.deleteAddress(value);
    };
    AddressBookComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-address-book',
            template: __webpack_require__(862),
            styles: [__webpack_require__(850)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_profile_service__["a" /* ProfileService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__service_profile_service__["a" /* ProfileService */]) === 'function' && _b) || Object])
    ], AddressBookComponent);
    return AddressBookComponent;
    var _a, _b;
}());
//# sourceMappingURL=address-book.component.js.map

/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_profile_service__ = __webpack_require__(380);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddressComponent = (function () {
    function AddressComponent(activatedRoute, profileService, router) {
        this.activatedRoute = activatedRoute;
        this.profileService = profileService;
        this.router = router;
        this.states = ["VA", "NY", "PA"];
        this.currentAddress = null;
        this.title = "Add";
        this.id = -1;
    }
    AddressComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profileService.getStateList()
            .toPromise()
            .then(function (data) {
            var states = data.object;
            _this.states = states;
        });
        this.routerParamsSubscription = this.activatedRoute.params
            .subscribe(function (data) {
            console.log(data);
            if (data["id"] != null) {
                _this.currentAddress = data;
                _this.title = "Update";
                if (_this.currentAddress.tag == null) {
                    _this.currentAddress.tag == "";
                }
                _this.id = _this.currentAddress.id;
                console.log(_this.currentAddress);
            }
            else {
                _this.title = "Add";
                _this.currentAddress = null;
            }
            // this.currentAddress = data;
            _this.buildForm();
        });
        console.log("Address ID : " + this.id);
    };
    AddressComponent.prototype.onSubmit = function () {
        var _this = this;
        var value = this.addressForm.value;
        if (this.id >= 0) {
            value.id = this.id;
            this.profileService.updateProfile(value)
                .toPromise()
                .then(function (data) {
                if (data.result == true) {
                    _this.router.navigateByUrl("/auth/account/my_addresses");
                }
                else {
                    alert("Add address failed");
                }
            });
        }
        else {
            this.profileService.addAddress(value)
                .toPromise()
                .then(function (data) {
                if (data.result == true) {
                    _this.router.navigateByUrl("/auth/account/my_addresses");
                }
                else {
                    alert("Address update failed");
                }
            });
        }
    };
    AddressComponent.prototype.buildForm = function () {
        this.addressName = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](this.currentAddress == null ? "" : this.currentAddress.tag, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(20)
        ]));
        this.street = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](this.currentAddress == null ? "" : this.currentAddress.street, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
        ]));
        this.city = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](this.currentAddress == null ? "" : this.currentAddress.city, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
        ]));
        this.state = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](this.currentAddress == null ? "" : this.currentAddress.state, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
        ]));
        this.zipcode = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](this.currentAddress == null ? "" : this.currentAddress.zipcode, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
        ]));
        this.suite = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](this.currentAddress == null ? "" : this.currentAddress.suite);
        this.addressForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormGroup */]({
            tag: this.addressName,
            zipcode: this.zipcode,
            street: this.street,
            city: this.city,
            stateID: this.state,
            suite: this.suite
        });
    };
    AddressComponent.prototype.ngOnDestroy = function () {
        this.routerParamsSubscription.unsubscribe();
    };
    AddressComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-address',
            template: __webpack_require__(863),
            styles: [__webpack_require__(851)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_profile_service__["a" /* ProfileService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__service_profile_service__["a" /* ProfileService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === 'function' && _c) || Object])
    ], AddressComponent);
    return AddressComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=address.component.js.map

/***/ }),

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrderListComponent = (function () {
    function OrderListComponent() {
    }
    OrderListComponent.prototype.ngOnInit = function () {
    };
    OrderListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-order-list',
            template: __webpack_require__(864),
            styles: [__webpack_require__(852)]
        }), 
        __metadata('design:paramtypes', [])
    ], OrderListComponent);
    return OrderListComponent;
}());
//# sourceMappingURL=order-list.component.js.map

/***/ }),

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentBookComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PaymentBookComponent = (function () {
    function PaymentBookComponent() {
    }
    PaymentBookComponent.prototype.ngOnInit = function () {
    };
    PaymentBookComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-payment-book',
            template: __webpack_require__(865),
            styles: [__webpack_require__(853)]
        }), 
        __metadata('design:paramtypes', [])
    ], PaymentBookComponent);
    return PaymentBookComponent;
}());
//# sourceMappingURL=payment-book.component.js.map

/***/ }),

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_profile_service__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_auth_service__ = __webpack_require__(249);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileUpdateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileUpdateComponent = (function () {
    function ProfileUpdateComponent(activatedRoute, fb, profileService, router, authService) {
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.profileService = profileService;
        this.router = router;
        this.authService = authService;
        this.index = 1;
        this.currentFirstname = "";
        this.currentLastname = "";
    }
    ProfileUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (data) {
            _this.index = data["index"];
        });
        console.log(this.index);
        this.buildProfileForm();
        this.buildPasswordForm();
        this.authService.getCurrentUser()
            .toPromise()
            .then(function (data) {
            var user = data.object;
            _this.currentFirstname = user.firstname;
            _this.lastname = user.lastname;
        });
    };
    ProfileUpdateComponent.prototype.updateOnSwitch = function (index) {
        this.index = index;
    };
    ProfileUpdateComponent.prototype.changePassword = function () {
        var _this = this;
        this.profileService.changePassword(this.passwordForm.value)
            .toPromise()
            .then(function (data) {
            if (data.result == true) {
                _this.router.navigateByUrl("/auth/account");
            }
            else {
                alert("Request failed due to: " + data.info);
            }
        });
    };
    ProfileUpdateComponent.prototype.updateProfile = function () {
        var _this = this;
        this.profileService.updateProfile(this.profileForm.value)
            .toPromise()
            .then(function (data) {
            if (data.result == true) {
                _this.router.navigateByUrl("/auth/account");
            }
            else {
                alert("Request failed");
            }
        });
    };
    ProfileUpdateComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ProfileUpdateComponent.prototype.buildProfileForm = function () {
        this.firstname = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */](this.currentFirstname, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(25)
        ]));
        this.lastname = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */](this.currentLastname, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(25)
        ]));
        this.profileForm = this.fb.group({
            firstname: this.firstname,
            lastname: this.lastname
        });
    };
    ProfileUpdateComponent.prototype.buildPasswordForm = function () {
        this.currentPassword = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]));
        this.newPassword = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(6),
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(15)
        ]));
        this.newPasswordConfirm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required
        ]));
        this.passwordForm = this.fb.group({
            currentPassword: this.currentPassword,
            password: this.newPassword,
            confirmedPassword: this.newPasswordConfirm
        }, { validator: this.comparePasswords.bind(this) });
    };
    ProfileUpdateComponent.prototype.comparePasswords = function (c) {
        return c.get("password").value == c.get("confirmedPassword").value ? null : { samePassword: true };
    };
    ProfileUpdateComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-profile-update',
            template: __webpack_require__(866),
            styles: [__webpack_require__(854)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_profile_service__["a" /* ProfileService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__service_profile_service__["a" /* ProfileService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__service_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__service_auth_service__["a" /* AuthService */]) === 'function' && _e) || Object])
    ], ProfileUpdateComponent);
    return ProfileUpdateComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=profile-update.component.js.map

/***/ }),

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(164);
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
    function ProfileComponent(router) {
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent.prototype.navigate = function (uri, params) {
        this.router.navigate([uri, params]);
    };
    ProfileComponent.prototype.navigateByUrl = function (url) {
        this.router.navigateByUrl(url);
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
            selector: 'app-profile',
            template: __webpack_require__(867),
            styles: [__webpack_require__(855)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _a) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a;
}());
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_profile_component__ = __webpack_require__(840);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_list_order_list_component__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_book_payment_book_component__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__address_book_address_book_component__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__address_book_address_component__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile_update_profile_update_component__ = __webpack_require__(839);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACCOUNT_ROUTE; });






/**
 * Created by Malloy on 3/9/2017.
 */
var ACCOUNT_ROUTE = [
    { path: "", component: __WEBPACK_IMPORTED_MODULE_0__profile_profile_component__["a" /* ProfileComponent */], pathMatch: "full" },
    { path: "my_orders", component: __WEBPACK_IMPORTED_MODULE_1__order_list_order_list_component__["a" /* OrderListComponent */] },
    { path: "my_payments", component: __WEBPACK_IMPORTED_MODULE_2__payment_book_payment_book_component__["a" /* PaymentBookComponent */] },
    { path: "my_addresses", component: __WEBPACK_IMPORTED_MODULE_3__address_book_address_book_component__["a" /* AddressBookComponent */] },
    { path: "update_address", component: __WEBPACK_IMPORTED_MODULE_4__address_book_address_component__["a" /* AddressComponent */] },
    { path: "update_profile", component: __WEBPACK_IMPORTED_MODULE_5__profile_profile_update_profile_update_component__["a" /* ProfileUpdateComponent */] },
    { path: "**", redirectTo: "", pathMatch: "full" }
];
//# sourceMappingURL=account.route.js.map

/***/ }),

/***/ 850:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(65)();
// imports


// module
exports.push([module.i, ".address-book-container {\n  width: 100%;\n  max-width: 1000px;\n  margin: 25px calc((100% - 310px * 3) / 2);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap; }\n  .address-book-container .address-book-item {\n    position: relative;\n    width: 300px;\n    height: 300px;\n    box-sizing: border-box;\n    border: 1px solid lightgrey;\n    margin: 5px;\n    display: inline-block; }\n    .address-book-container .address-book-item div {\n      box-sizing: content-box;\n      display: block;\n      margin: 0 0 auto 0; }\n      .address-book-container .address-book-item div > * {\n        padding: 10px 15px;\n        margin: 0; }\n      .address-book-container .address-book-item div p {\n        padding-top: 10px;\n        padding-bottom: 0; }\n      .address-book-container .address-book-item div h3 {\n        border-bottom: 1px solid lightgrey;\n        height: 20px;\n        font-weight: normal;\n        font-size: medium; }\n    .address-book-container .address-book-item .btn-group-address-book {\n      height: 35px;\n      margin-top: auto;\n      display: block;\n      position: absolute;\n      bottom: 20px;\n      left: 15px; }\n      .address-book-container .address-book-item .btn-group-address-book button {\n        display: inline-block;\n        min-width: 60px;\n        width: auto; }\n  .address-book-container .address-book-add {\n    border: 2px dashed lightgrey; }\n    .address-book-container .address-book-add button {\n      display: block;\n      width: 100%;\n      height: 100%;\n      outline: none;\n      background-color: transparent;\n      border: none;\n      font-size: 1.5em;\n      font-weight: bold;\n      color: grey; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 851:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(65)();
// imports


// module
exports.push([module.i, ".address-container {\n  width: 100%;\n  max-width: 500px;\n  margin: auto; }\n  .address-container form > * {\n    width: 100%;\n    max-width: 350px;\n    margin: auto; }\n  .address-container form table {\n    margin: 25px auto; }\n    .address-container form table tr td .address-update-rightCol {\n      display: block;\n      max-width: 150px;\n      margin: auto 0 auto auto; }\n    .address-container form table tr td input {\n      border-radius: 3px;\n      border: 1px solid lightgrey;\n      text-indent: 8px;\n      outline: none;\n      width: 100%; }\n    .address-container form table tr td input {\n      height: 30px; }\n    .address-container form table tr td select {\n      min-height: 30px;\n      max-height: 200px;\n      overflow-y: scroll; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(65)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(65)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 854:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(65)();
// imports


// module
exports.push([module.i, ".profile-update-container {\n  width: 100%;\n  max-width: 600px;\n  margin: auto; }\n  .profile-update-container ul {\n    list-style: none;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 0;\n    border-bottom: 1px solid grey; }\n    .profile-update-container ul li {\n      padding: 0;\n      margin-bottom: -1px; }\n      .profile-update-container ul li.active button {\n        border: 1px solid grey;\n        border-bottom-color: transparent;\n        border-radius: 3px 3px 0 0; }\n      .profile-update-container ul li button {\n        background-color: white;\n        padding: 10px;\n        outline: none;\n        cursor: pointer;\n        border: none;\n        font-weight: bold;\n        font-size: 1.1em; }\n  .profile-update-container .profile-update-content-container form {\n    min-height: 300px;\n    position: relative;\n    padding-bottom: 50px; }\n    .profile-update-container .profile-update-content-container form > * {\n      margin: auto;\n      width: 100%;\n      max-width: 300px; }\n    .profile-update-container .profile-update-content-container form table td {\n      padding: 0; }\n    .profile-update-container .profile-update-content-container form table input {\n      width: 100%;\n      height: 25px;\n      text-indent: 8px; }\n    .profile-update-container .profile-update-content-container form .btn-update-submit-container {\n      position: absolute;\n      right: 0;\n      left: 0;\n      top: calc(100% - 40px); }\n      .profile-update-container .profile-update-content-container form .btn-update-submit-container button {\n        width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 855:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(65)();
// imports


// module
exports.push([module.i, ".account-conatiner {\n  width: 100%;\n  max-width: 800px;\n  margin: auto; }\n  .account-conatiner .account-list-item {\n    width: 100%;\n    box-sizing: border-box;\n    padding: 20px;\n    margin: 20px 0;\n    border: lightgrey 1px solid;\n    border-radius: 5px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    .account-conatiner .account-list-item > div {\n      box-sizing: border-box;\n      display: block;\n      height: 100%;\n      width: 100%; }\n    .account-conatiner .account-list-item .account-list-item-title-container {\n      width: 200px; }\n      .account-conatiner .account-list-item .account-list-item-title-container img {\n        display: block;\n        margin: auto; }\n    .account-conatiner .account-list-item .account-list-item-content-container {\n      margin: 0 0 auto 30px;\n      height: 100%;\n      width: 100%; }\n      .account-conatiner .account-list-item .account-list-item-content-container h3 {\n        text-indent: 1em;\n        margin: 0;\n        height: 80px;\n        width: 100%;\n        display: block;\n        font-size: 1.5em; }\n      .account-conatiner .account-list-item .account-list-item-content-container table {\n        height: 100%;\n        width: 100%;\n        margin: auto;\n        text-align: center;\n        table-layout: fixed; }\n        .account-conatiner .account-list-item .account-list-item-content-container table td {\n          padding: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 862:
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n  <div class=\"address-book-container\">\r\n    <div class=\"address-book-item address-book-add\">\r\n      <button (click)=\"onEdit(null)\">Add Address</button>\r\n    </div>\r\n    <div class=\"address-book-item\" *ngFor=\"let address of addresses\">\r\n\r\n      <div>\r\n      <h3 *ngIf=\"address.isPrimary\">Default Address</h3>\r\n      <p style=\"font-weight: bold\">{{address.tag}}; id:{{address.id}}</p>\r\n      <p>{{address.street}} {{address.suite}}</p>\r\n      <p>{{address.city}}, {{address.state}} {{address.zipcode}}</p>\r\n      </div>\r\n\r\n      <div class=\"btn-group-address-book\">\r\n        <button (click)=\"onEdit(address)\" class=\"btn-profile\">Edit</button>\r\n        &nbsp;\r\n        <button class=\"btn-profile\" (click)=\"onDelete(address.id)\">Delete</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 863:
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n  <div class=\"address-container\">\r\n    <form [formGroup]=\"addressForm\" (ngSubmit)=\"onSubmit()\">\r\n      <h2>{{title}} a New Address</h2>\r\n      <table>\r\n        <tr>\r\n          <td>Address Tag</td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"2\">\r\n            <input type=\"text\" formControlName=\"tag\" placeholder=\"Example:Home, Office\">\r\n          </td>\r\n        </tr>\r\n\r\n        <tr class=\"form-validator\">\r\n          <td colspan=\"2\" *ngIf=\"addressName.hasError('maxlength')&&addressName.touched\">Tag must have up to 20\r\n            characters\r\n          </td>\r\n          <td colspan=\"2\" *ngIf=\"addressName.hasError('required')&&addressName.touched\">Tag required</td>\r\n          <td *ngIf=\"addressName.valid||!addressName.touched\">&nbsp;</td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>Street Address</td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"2\">\r\n            <input type=\"text\" formControlName=\"street\">\r\n          </td>\r\n        </tr>\r\n        <tr class=\"form-validator\">\r\n          <td colspan=\"2\" *ngIf=\"street.hasError('required')&&street.touched\">Street address required</td>\r\n          <td *ngIf=\"street.valid||!street.touched\">&nbsp;</td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>Address Continued</td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"2\">\r\n            <input type=\"text\" formControlName=\"suite\" placeholder=\"Apartment, Suite, Building, etc\">\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td>&nbsp;</td>\r\n          <td>&nbsp;</td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>City</td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"2\">\r\n            <input type=\"text\" formControlName=\"city\">\r\n          </td>\r\n        </tr>\r\n        <tr class=\"form-validator\">\r\n          <td *ngIf=\"city.hasError('required')&&city.touched\">City required</td>\r\n          <td *ngIf=\"city.valid||!city.touched\">&nbsp;</td>\r\n        </tr>\r\n\r\n        <tr>\r\n          <td>State</td>\r\n          <td><span class=\"address-update-rightCol\">Zip Code</span></td>\r\n        </tr>\r\n        <tr>\r\n          <td>\r\n            <select formControlName=\"stateID\" style=\"width: 60px;max-width: 100%\">\r\n              <option *ngFor=\"let item of states\"\r\n                      [value]=\"item.id\"\r\n                      [selected]=\"item.id==state.value?'selected':null\">\r\n                {{item.state}}\r\n              </option>\r\n            </select>\r\n          </td>\r\n          <td>\r\n            <input type=\"text\" formControlName=\"zipcode\" class=\"address-update-rightCol\">\r\n          </td>\r\n        </tr>\r\n        <tr class=\"form-validator\">\r\n          <td *ngIf=\"state.hasError('required')&&state.touched\">State required</td>\r\n          <td *ngIf=\"state.valid||!state.touched\">&nbsp;</td>\r\n          <td *ngIf=\"zipcode.hasError('required')&&zipcode.touched\"><span class=\"address-update-rightCol\">Zip code required</span>\r\n          </td>\r\n          <td *ngIf=\"zipcode.valid||!zipcode.touched\">&nbsp;</td>\r\n        </tr>\r\n\r\n      </table>\r\n      <div class=\"btn-address-submit-container\">\r\n        <button type=\"submit\" [disabled]=\"!addressForm.valid||addressForm.pending\" class=\"btn-profile\">{{title}} Address\r\n        </button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 864:
/***/ (function(module, exports) {

module.exports = "<p>\n  order-list works!\n</p>\n"

/***/ }),

/***/ 865:
/***/ (function(module, exports) {

module.exports = "<p>\n  payment-book works!\n</p>\n"

/***/ }),

/***/ 866:
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n  <div class=\"profile-update-container\">\r\n    <ul>\r\n      <li [ngClass]=\"{'active': index==1}\">\r\n        <button (click)=\"updateOnSwitch(1)\">Update Profile</button>\r\n      </li>\r\n      <li [ngClass]=\"{'active': index==2}\">\r\n        <button (click)=\"updateOnSwitch(2)\">Change Password</button>\r\n      </li>\r\n    </ul>\r\n    <div class=\"profile-update-content-container\">\r\n      <div class=\"update-info-container\" [ngClass]=\"{'display-none': index!=1}\">\r\n        <form [formGroup]=\"profileForm\" (ngSubmit)=\"updateProfile()\">\r\n          <table>\r\n            <tr>\r\n              <td>First Name</td>\r\n            </tr>\r\n            <tr>\r\n              <td><input type=\"text\" formControlName=\"firstname\"></td>\r\n            </tr>\r\n            <tr class=\"form-validator\">\r\n              <td *ngIf=\"firstname.valid||!firstname.touched\">&nbsp;</td>\r\n              <td *ngIf=\"firstname.hasError('maxlength')&&firstname.touched\">Should have up to 25 characters</td>\r\n              <td *ngIf=\"firstname.hasError('required')&&firstname.touched\">First name required</td>\r\n            </tr>\r\n\r\n            <tr>\r\n              <td>Last Name</td>\r\n            </tr>\r\n            <tr>\r\n              <td><input type=\"text\" formControlName=\"lastname\"></td>\r\n            </tr>\r\n            <tr class=\"form-validator\">\r\n              <td *ngIf=\"lastname.valid||!lastname.touched\">&nbsp;</td>\r\n              <td *ngIf=\"lastname.hasError('maxlength')&&lastname.touched\">Should have up to 25 characters</td>\r\n              <td *ngIf=\"lastname.hasError('required')&&lastname.touched\">Last name required</td>\r\n            </tr>\r\n\r\n          </table>\r\n          <div class=\"btn-update-submit-container\">\r\n            <button type=\"submit\" class=\"btn-profile\" [disabled]=\"profileForm.invalid\">Update Profile</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class=\"update-password-container profile-update-content-container\" [ngClass]=\"{'display-none': index!=2}\">\r\n      <form [formGroup]=\"passwordForm\" (ngSubmit)=\"changePassword()\">\r\n        <table>\r\n          <tr>\r\n            <td>Current Password</td>\r\n          </tr>\r\n          <tr>\r\n            <td><input type=\"password\" formControlName=\"currentPassword\"></td>\r\n          </tr>\r\n          <tr class=\"form-validator\">\r\n            <td *ngIf=\"currentPassword.valid||!currentPassword.touched\">&nbsp;</td>\r\n            <td *ngIf=\"currentPassword.hasError('required')&&currentPassword.touched\">Current password required</td>\r\n          </tr>\r\n\r\n          <tr>\r\n            <td>New Password</td>\r\n          </tr>\r\n          <tr>\r\n            <td><input type=\"password\" formControlName=\"password\" placeholder=\"6-15 characters\"></td>\r\n          </tr>\r\n          <tr class=\"form-validator\">\r\n            <td *ngIf=\"newPassword.valid||!newPassword.touched\">&nbsp;</td>\r\n            <td *ngIf=\"newPassword.invalid&&newPassword.touched\">Invalid password</td>\r\n          </tr>\r\n\r\n          <tr>\r\n            <td>Confirm New Password</td>\r\n          </tr>\r\n          <tr>\r\n            <td><input type=\"password\" formControlName=\"confirmedPassword\"></td>\r\n          </tr>\r\n          <tr class=\"form-validator\">\r\n            <td *ngIf=\"!passwordForm.hasError('samePassword')||!newPasswordConfirm.touched\">&nbsp;</td>\r\n            <td *ngIf=\"passwordForm.hasError('samePassword')&&newPasswordConfirm.touched\">Two passwords do not match</td>\r\n          </tr>\r\n        </table>\r\n\r\n        <div class=\"btn-update-submit-container\">\r\n          <button type=\"submit\" class=\"btn-profile\" [disabled]=\"passwordForm.invalid\">Change Password</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 867:
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n  <div class=\"account-conatiner\">\r\n    <div class=\"account-list-item\">\r\n      <div class=\"account-list-item-title-container\">\r\n        <img src=\"/assets/images/box.svg\" alt=\"orders\">\r\n      </div>\r\n      <div class=\"account-list-item-content-container\">\r\n        <h3>My Orders</h3>\r\n        <table>\r\n          <tr>\r\n            <td>\r\n              <button class=\"btn-profile\">All Orders</button>\r\n            </td>\r\n            <td>\r\n              <button class=\"btn-profile\">Orders In Process</button>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n              <button class=\"btn-profile\">Delivered Orders</button>\r\n            </td>\r\n            <td>\r\n              <button class=\"btn-profile\">Canceled Orders</button>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"account-list-item\">\r\n      <div class=\"account-list-item-title-container\">\r\n        <img src=\"/assets/images/id-card.svg\" alt=\"profile\">\r\n      </div>\r\n      <div class=\"account-list-item-content-container\">\r\n        <h3>My Profile</h3>\r\n        <table>\r\n          <tr>\r\n            <td>\r\n              <button (click)=\"navigate('/auth/account/update_profile',{index:1})\" class=\"btn-profile\">Update Profile</button>\r\n            </td>\r\n            <td>\r\n              <button (click)=\"navigate('/auth/account/update_profile',{index:2})\" class=\"btn-profile\">Change Password</button>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n              <button class=\"btn-profile\">My Favorites</button>\r\n            </td>\r\n            <td>\r\n              <!--<button>Canceled Process</button>-->\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"account-list-item\">\r\n      <div class=\"account-list-item-title-container\">\r\n        <img src=\"/assets/images/agenda.svg\" alt=\"profile\">\r\n      </div>\r\n      <div class=\"account-list-item-content-container\">\r\n        <h3>Address Book</h3>\r\n        <table>\r\n          <tr>\r\n            <td>\r\n              <button (click)=\"navigateByUrl('/auth/account/my_addresses')\" class=\"btn-profile\">Manage Address</button>\r\n            </td>\r\n            <td>\r\n              <button (click)=\"navigateByUrl('/auth/account/update_address')\" class=\"btn-profile\">Add a New Address</button>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"account-list-item\">\r\n      <div class=\"account-list-item-title-container\">\r\n        <img src=\"/assets/images/smartphone.svg\" alt=\"profile\">\r\n      </div>\r\n      <div class=\"account-list-item-content-container\">\r\n        <h3>Payment Book</h3>\r\n        <table>\r\n          <tr>\r\n            <td>\r\n              <button class=\"btn-profile\">Manage Payment</button>\r\n            </td>\r\n            <td>\r\n              <button class=\"btn-profile\">Add a New Payment</button>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ })

});
//# sourceMappingURL=0.chunk.js.map