import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    // | Observable<boolean | UrlTree>
    // | Promise<boolean | UrlTree>
    | boolean
 /*   | UrlTree */ {
    // const currentUser = this.authService.isLoggedIn();

    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/auth'], {
      queryParams: { returnUrl: state.url }
    });

    return false;
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}