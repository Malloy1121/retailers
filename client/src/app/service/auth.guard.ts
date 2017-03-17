/**
 * Created by Malloy on 3/16/2017.
 */
import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
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
                this.router.navigateByUrl("/auth/login");
              }
            });

          return false;
        }
      });
  }

}
