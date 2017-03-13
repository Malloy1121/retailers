import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class ProfileService {

  constructor(private http: Http) {
  }

  changePassword(value) {
    console.log(value);
    return this.http.post("/user/changePassword", value)
      .map((response: Response) => response.json());
  }

  updateProfile(value) {
    console.log(value);
    return this.http.post("/user/updateProfile", value)
      .map((response: Response) => response.json());
  }

  getCurrentAddresses() {
    return this.http.get("/user/getCurrentAddresses")
      .map((response: Response) => response.json());
  }

  addAddress(value) {
    console.log(value);
    return this.http.post("/user/addNewAddress", value)
      .map((response: Response) => response.json());
  }

  editAddress(value) {
    console.log(value);
    return this.http.post("/user/editAddress", value)
      .map((response: Response) => response.json());
  }

  deleteAddress(value) {
    console.log(value);
    return this.http.post("/user/deleteAddress", value)
      .map((response: Response) => response.json());
  }

  getStateList() {
    return this.http.get("/user/getStateList")
      .map((response: Response) => response.json());
  }

}
