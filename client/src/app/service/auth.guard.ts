/**
 * Created by Malloy on 3/16/2017.
 */
import {Injectable} from "@angular/core";
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route,
  CanActivateChild
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean>
    | boolean {
    console.log("request sent from" + state.url);
    // return true;
    return this.isAuthenticated(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean>
    | boolean {
    return this.isAuthenticated(state.url);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    return this.isAuthenticated(null);
  }

  isAuthenticated(url): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getCurrentUser()
      .toPromise()
      .then(data => {
        console.log(data);
        if (data.result == true) {
          return true;
        }
        else {
          this.authService.logout()
            .toPromise()
            .then(data => {
              if (data == 200) {
                if (url) {
                  this.router.navigate(["/auth/login", {url: url}]);
                }
                else {
                  this.router.navigate(["/auth/login"]);
                }
              }
            });

          return false;
        }
      });
  }

}
