import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService,  private router: Router,
    private alertify: AlertifyService) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['dashboard']);
        this.alertify.error('Bạn không có quyền truy cập!');
        return false;
      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('Bạn chưa đăng nhập');
    this.router.navigate(['/authentication/login']);
    return false;
  }
}
