import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { ServiceCardsComponent } from './service-cards/service-cards.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlickCarouselModule } from '../../../node_modules/ngx-slick-carousel';
import { AddTicketModalComponent } from './add-ticket-modal/add-ticket-modal.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    UserComponent,
    IndexComponent,
    AddTicketModalComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [UserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
