import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ShoppingService} from "./shopping.service";

@Injectable()
export class ProductDetailGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean>
    | boolean {

    const id = route.params["id"];
    console.log(id);
    return this.shpService.ifItemExist(id)
      .toPromise()
      .then(data => {
        if (data.result == false) {
          this.router.navigateByUrl("/products/product-list");
        }
        return data.result;
      });

  }

  constructor(private shpService: ShoppingService, private router: Router) {
  }

}
