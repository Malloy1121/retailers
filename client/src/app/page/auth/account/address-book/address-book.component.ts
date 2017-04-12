import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Address} from "../../../../model/address";
import {ProfileService} from "../../../../service/profile.service";


declare var alert: any;

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
    this.onLoad()
  }

  onLoad() {
    this.profileService.getCurrentAddresses()
      .toPromise()
      .then(data => {
        console.log(data.object);
        const object = data.object;
        this.addresses = object;

        for (let address of this.addresses) {
          if (address.isPrimary) {
            const first = this.addresses.splice(0, this.addresses.indexOf(address));
            const last = this.addresses.splice(this.addresses.indexOf(address) + 1, this.addresses.length);
            this.addresses = [address].concat(first).concat(last);
            // console.log("sorted address array first: ", first);
            // console.log("sorted address array last: ", last);
            break;
          }
        }
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
    this.profileService.deleteAddress(value)
      .toPromise()
      .then(data => {
        this.onLoad();
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSetDefault(address) {
    this.profileService.setAddressToDefault(address)
      .toPromise()
      .then(data => {
        if (data.result == true) {
          this.onLoad();
        }
        else {
          alert("Request failed! Please try again later!");
        }
      })
  }


}
