import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isAuthenticated: boolean = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.spinnerService.activateSpinner();
    this.loginService.getAuthenticated().subscribe((res) => {
      if (res) {
        this.isAuthenticated = true;
      } else {
        // this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
    this.spinnerService.deactivateSpinner();
    return true;
    return this.isAuthenticated;
    // if (this.loginService.getAuthenticated()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}
