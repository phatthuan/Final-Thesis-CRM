import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './user/header/header.component';
import { HeroBannerComponent } from './user/hero-banner/hero-banner.component';
import { ServiceCardsComponent } from './user/service-cards/service-cards.component';
import { LoginComponent } from './user/login/login.component';
import { LoginComponent as Login } from './admin/login/login.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SignupComponent } from './user/signup/signup.component';
import { ServiceCatalogComponent } from './user/service-catalog/service-catalog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UserRoutingModule } from './user/user-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { FormsModule } from '@angular/forms';
import { HeaderMenuComponent } from './admin/header-menu/header-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEditorModule } from 'ngx-editor';
import { SlickCarouselModule } from '../../node_modules/ngx-slick-carousel';
import { ProductsComponent } from './admin/products/products.component';
import { DeleteModalComponent } from './admin/delete-modal/delete-modal.component';
import { UpdateModalComponent } from './admin/update-modal/update-modal.component';
import {
  ContainerComponent,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  TextColorDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgScrollbar } from 'ngx-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SidebarMenuComponent } from './admin/sidebar/sidebar.component';
import { AppNavItemComponent } from './admin/sidebar/nav-item/nav-item.component';
import { ContactComponent } from './admin/contact/contact.component';
import { UpdateModalContactComponent } from './admin/update-modal-contact/update-modal-contact.component';
import { TicketsComponent } from './admin/tickets/tickets.component';
import { UpdateModalTicketComponent } from './admin/update-modal-ticket/update-modal-ticket.component';
import { AddTicketModalComponent } from './user/add-ticket-modal/add-ticket-modal.component';
import { AddTicketComponent } from './admin/add-ticket/add-ticket.component';
import { AddContactComponent } from './admin/add-contact/add-contact.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddLeadComponent } from './admin/add-lead/add-lead.component';
import { LeadsComponent } from './admin/leads/leads.component';
import { UpdateModalLeadComponent } from './admin/update-modal-lead/update-modal-lead.component';
import { AddQuoteComponent } from './admin/add-quote/add-quote.component';
import { UpdateModalQuoteComponent } from './admin/update-modal-quote/update-modal-quote.component';
import { DeleteModalQuoteComponent } from './admin/delete-modal-quote/delete-modal-quote.component';
import { QuotesComponent } from './admin/quotes/quotes.component';
import { AddActivityComponent } from './admin/add-activity/add-activity.component';
import { ActivitiesComponent } from './admin/activities/activities.component';
import { DeleteModalActivityComponent } from './admin/delete-modal-activity/delete-modal-activity.component';
import { DocumentEditorModule } from '@txtextcontrol/tx-ng-document-editor';
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer';
import { UpdateContactInfoModalComponent } from './admin/update-contact-info-modal/update-contact-info-modal.component';
import { CreateFbPostComponent } from './admin/create-fb-post/create-fb-post.component';
import { PostYtVideoComponent } from './admin/post-yt-video/post-yt-video.component';
import { DataTablesModule } from "angular-datatables";
import { DeleteModalCustomerComponent } from './admin/delete-modal-customer/delete-modal-customer.component';
import { UpdateModalCustomerComponent } from './admin/update-modal-customer/update-modal-customer.component';
import { AddCustomerComponent } from './admin/add-customer/add-customer.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { AddPaymentEmailComponent } from './admin/add-payment-email/add-payment-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroBannerComponent,
    ServiceCardsComponent,
    LoginComponent,
    SignupComponent,
    ServiceCatalogComponent,
    AdminComponent,
    AdminDashboardComponent,
    UserComponent,
    DashboardComponent,
    HeaderMenuComponent,
    ProductsComponent,
    DeleteModalComponent,
    AddProductComponent,
    UpdateModalComponent,
    SidebarMenuComponent,
    AppNavItemComponent,
    Login,
    ContactComponent,
    AddContactComponent,
    UpdateModalContactComponent,
    AddTicketComponent,
    TicketsComponent,
    UpdateModalTicketComponent,
    AddTicketModalComponent,
    PageNotFoundComponent,
    AddLeadComponent,
    LeadsComponent,
    UpdateModalLeadComponent,
    AddQuoteComponent,
    UpdateModalQuoteComponent,
    DeleteModalQuoteComponent,
    QuotesComponent,
    AddActivityComponent,
    ActivitiesComponent,
    DeleteModalActivityComponent,
    UpdateContactInfoModalComponent,
    CreateFbPostComponent,
    PostYtVideoComponent,
    UpdateModalCustomerComponent,
    DeleteModalCustomerComponent,
    AddCustomerComponent,
    CustomerComponent,
    AddEventComponent,
    AddPaymentEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserRoutingModule,
    AdminRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxEditorModule,
    SlickCarouselModule,
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    // SidebarTogglerDirective,
    // DefaultHeaderComponent,
    // ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    BrowserAnimationsModule,
    MaterialModule,
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    // DefaultFooterComponent
    ContainerComponent,
    DocumentEditorModule,
    DocumentViewerModule,
    DataTablesModule,
  ],
  providers: [],
  exports: [TablerIconsModule, HeaderMenuComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
