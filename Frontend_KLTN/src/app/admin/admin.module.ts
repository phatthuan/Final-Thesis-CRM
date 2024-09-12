import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin.component';
import { TicketsComponent } from './tickets/tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { NgxEditorModule } from 'ngx-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from './products/products.component';
import { CommonModule, NgStyle } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';
import { LoginComponent } from './login/login.component';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, FormControlDirective, FormDirective, HeaderComponent, InputGroupComponent, InputGroupTextDirective, RowComponent, SidebarComponent, TextColorDirective } from '@coreui/angular';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MaterialModule } from '../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { SidebarMenuComponent } from './sidebar/sidebar.component';
import { AppNavItemComponent } from './sidebar/nav-item/nav-item.component';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { UpdateModalContactComponent } from './update-modal-contact/update-modal-contact.component';
import { UpdateModalTicketComponent } from './update-modal-ticket/update-modal-ticket.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AddProductComponent } from './add-product/add-product.component';
import { LeadsComponent } from './leads/leads.component';
import { OrdersComponent } from './orders/orders.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { UpdateModalLeadComponent } from './update-modal-lead/update-modal-lead.component';
import { DeleteModalQuoteComponent } from './delete-modal-quote/delete-modal-quote.component';
import { UpdateModalQuoteComponent } from './update-modal-quote/update-modal-quote.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { DeleteModalActivityComponent } from './delete-modal-activity/delete-modal-activity.component';
import { UpdateContactInfoModalComponent } from './update-contact-info-modal/update-contact-info-modal.component';
import { CreateFbPostComponent } from './create-fb-post/create-fb-post.component';
import { PostYtVideoComponent } from './post-yt-video/post-yt-video.component';
import { UpdateModalCustomerComponent } from './update-modal-customer/update-modal-customer.component';
import { DeleteModalCustomerComponent } from './delete-modal-customer/delete-modal-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddPaymentEmailComponent } from './add-payment-email/add-payment-email.component';
import { ConvertLeadToCustomerModalComponent } from './convert-lead-to-customer-modal/convert-lead-to-customer-modal.component';



@NgModule({
  declarations: [
    AdminComponent,
    TicketsComponent,
    NewTicketComponent,
    ProductsComponent,
    DeleteModalComponent,
    AddProductComponent,
    UpdateModalComponent,
    LoginComponent,
    AdminDashboardComponent,
    HeaderMenuComponent,
    SidebarMenuComponent,
    AppNavItemComponent,
    ContactComponent,
    AddContactComponent,
    UpdateModalContactComponent,
    AddTicketComponent,
    UpdateModalTicketComponent,
    LeadsComponent,
    OrdersComponent,
    ActivitiesComponent,
    CampaignsComponent,
    QuotesComponent,
    AddLeadComponent,
    UpdateModalLeadComponent,
    DeleteModalQuoteComponent,
    UpdateModalQuoteComponent,
    AddQuoteComponent,
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
    ConvertLeadToCustomerModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgxEditorModule,
    FontAwesomeModule,
    HeaderComponent,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    FormControlDirective,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    ButtonDirective,
    NgStyle,
    FormControlDirective,
    FormsModule
    
  ],
  exports: [
    TablerIconsModule,
    HeaderMenuComponent],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AppModule { }
