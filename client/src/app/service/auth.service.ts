import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private isAuthenticated:boolean=false;
  constructor() { }

  login(){
    this.isAuthenticated=true;
    const isAuthenticated=this.isAuthenticated;
    return isAuthenticated;
  }

  logout(){
    this.isAuthenticated=false;
    const isAuthenticated=this.isAuthenticated;
    return isAuthenticated;
  }

  signUp(){

  }

  getIsAuthenticated(){
    const isAuthenticated=this.isAuthenticated
    return isAuthenticated;
  }

}
