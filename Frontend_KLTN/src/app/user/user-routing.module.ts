import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceCardsComponent } from './service-cards/service-cards.component';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { IndexComponent } from './index/index.component';
import { AuthService } from './service/auth.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '', 
    component: UserComponent,
    children :
    [
      {path: '', component: IndexComponent},
      {path: 'home', component: DashboardComponent},
      {path: 'home/login', component: LoginComponent,canActivate: [AuthService]},
      {path: 'home/signup', component: SignupComponent,canActivate: [AuthService]},
      {path: 'home/service-catalog', component: ServiceCatalogComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
