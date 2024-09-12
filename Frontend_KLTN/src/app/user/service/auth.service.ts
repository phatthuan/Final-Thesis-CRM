import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  constructor(private userService: UserService, private router: Router) { }
  
  canActivate(): boolean {
    if (!this.userService.currentUserValue) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
