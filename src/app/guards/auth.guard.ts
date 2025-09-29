import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      // Check role-based access
      const requiredRole = route.data?.['role'];
      if (requiredRole) {
        const user = this.authService.getCurrentUser();
        if (user?.role !== requiredRole) {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
