import {Injectable} from "@angular/core";
import {CheckoutService} from "./checkout.service";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
/**
 * Created by Malloy on 4/10/2017.
 */

@Injectable()
export class CheckoutGuard implements CanActivate {

  constructor(private checkoutService: CheckoutService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean>
    | boolean {

    const result = this.checkoutService.canGoToCheckout;
    if (!result) {
      this.router.navigateByUrl("/products/cart");
    }
    return result;
  }


}
