import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { User } from '../user';
import { ImageFile } from '../imageFile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() userLoginData!: any;
  @Input() isLoggedInUser!: any;
  currentUser?: User | null;

  constructor(private router: Router, public userService:UserService) {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
  
  getName(user: User | null | undefined): string {
    return user && user.firstName ? user.firstName : "";
  }

  getImagePath(imageFile: ImageFile | undefined): string {
    return imageFile && imageFile.data ? `data:image/png;base64,${imageFile!.data}` : '';
  }

  logout(): void {
    this.userService.clearUser();
    sessionStorage.removeItem('token');
    // this.router.navigate(['/']);
  }

}
