import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../user/service/auth.service';
import { UserService } from '../user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(): boolean {
    if (sessionStorage.getItem('admin-token') !== null) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
