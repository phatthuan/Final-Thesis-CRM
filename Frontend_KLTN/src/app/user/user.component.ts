import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './user';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  {
  // userLoginData!:any ;
  // isLoggedInUser:any = true;
  constructor(private route: ActivatedRoute, private authService: AuthService){

  }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.userLoginData = JSON.parse(params['userLoginData']);
  //     this.authService.setLoggedInStatus(true);
  //     this.isLoggedInUser = true;
  //   });
  // }

  // logout():void{
  //   this.authService.setLoggedInStatus(false);
  //   this.isLoggedInUser = false;
  // }
}
