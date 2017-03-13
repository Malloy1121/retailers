import {Component, OnInit} from '@angular/core';
import {Address} from "../../../model/address";
import {Router} from "@angular/router";
import {ProfileService} from "../../../service/profile.service";

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  private addresses: Address[] = [];

  constructor(private router: Router,
              private profileService: ProfileService) {
  }

  ngOnInit() {
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

    for (let address of this.addresses) {
      if (address.isPrimary) {
        const first = this.addresses.splice(0, this.addresses.indexOf(address));
        const last = this.addresses.splice(this.addresses.indexOf(address) + 1, this.addresses.length);
        this.addresses = [address].concat(first).concat(last);
        break;
      }
    }

    this.profileService.getCurrentAddresses()
      .toPromise()
      .then(data => {
        console.log(data.object);
        const object = data.object;
        this.addresses = object;
      });
  }

  onEdit(params: Address) {
    if (params == null) {
      this.router.navigateByUrl("/auth/account/update_address");
    }
    else {
      this.router.navigate(["/auth/account/update_address", params]);
    }
  }

  onDelete(value) {
    this.profileService.deleteAddress(value);
  }

}
