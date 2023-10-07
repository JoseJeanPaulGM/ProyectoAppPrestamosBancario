import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.getAuthenticated()) {
      return true; // El usuario está autenticado y puede acceder al componente "dashboard"
    } else {
      // El usuario no está autenticado, redirige al componente de inicio de sesión "login"
      return this.router.createUrlTree(['/principal']);
    }
  }
}
