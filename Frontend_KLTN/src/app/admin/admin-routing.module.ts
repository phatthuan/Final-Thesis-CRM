import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TicketsComponent } from './tickets/tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserComponent } from '../user/user.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { QuotesComponent } from './quotes/quotes.component';
import { LeadsComponent } from './leads/leads.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddPaymentEmailComponent } from './add-payment-email/add-payment-email.component';
const routes: Routes = [
  {
    path: 'admin',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'it-service',
        children: [
          { path: 'dashboard', component: AdminDashboardComponent, data: { pageType: 'it-service' } },
          { path: 'tickets', component: TicketsComponent, data: { pageType: 'it-service' } },
          { path: 'tickets/new', component: AddTicketComponent, data: { pageType: 'it-service' } },
          { path: 'products', component: ProductsComponent, data: { pageType: 'it-service' } },
          { path: 'products/new', component: AddProductComponent, data: { pageType: 'it-service' } },
          { path: 'contacts', component: ContactComponent, data: { pageType: 'it-service' } },
          { path: 'contacts/new', component: AddContactComponent, data: { pageType: 'it-service' } },
          // { path: 'orders', component: OrdersComponent, data: { pageType: 'it-service' } },
          // { path: 'activities', component: ActivitiesComponent, data: { pageType: 'it-service' } },
          // { path: 'campaigns', component: CampaignsComponent, data: { pageType: 'it-service' } },
          // { path: 'quotes', component: QuotesComponent, data: { pageType: 'it-service' } },
          // { path: 'leads', component: LeadsComponent, data: { pageType: 'it-service' } },
        ],
        data: { pageType: 'it-service' }
      },
      {
        path: 'crm',
        children: [
          { path: 'dashboard', component: AdminDashboardComponent, data: { pageType: 'crm' }, },
          { path: 'tickets', component: TicketsComponent, data: { pageType: 'crm' }, },
          { path: 'tickets/new', component: AddTicketComponent, data: { pageType: 'crm' }, },
          { path: 'products', component: ProductsComponent, data: { pageType: 'crm' }, },
          { path: 'products/new', component: AddProductComponent, data: { pageType: 'crm' }, },
          { path: 'contacts', component: ContactComponent, data: { pageType: 'crm' }, },
          { path: 'contacts/new', component: AddContactComponent, data: { pageType: 'crm' }, },
          { path: 'orders', component: OrdersComponent, data: { pageType: 'crm' } },
          { path: 'activities', component: ActivitiesComponent, data: { pageType: 'crm' } },
          { path: 'activities/new', component: AddActivityComponent, data: { pageType: 'crm' } },
          { path: 'campaigns', component: CampaignsComponent, data: { pageType: 'crm' } },
          { path: 'quotes', component: QuotesComponent, data: { pageType: 'crm' } },
          { path: 'quotes/new', component: AddQuoteComponent, data: { pageType: 'crm' } },
          { path: 'leads', component: LeadsComponent, data: { pageType: 'crm' } },
          { path: 'leads/new', component: AddLeadComponent, data: { pageType: 'crm' } },
          { path: 'customers', component: CustomerComponent, data: { pageType: 'crm' } },
          { path: 'customers/new', component: AddCustomerComponent, data: { pageType: 'crm' } },
          { path: 'calendar', component: CalendarComponent, data: { pageType: 'crm' } },
          { path: 'event/new', component: AddEventComponent, data: { pageType: 'crm' } },
          { path: 'payment/new', component: AddPaymentEmailComponent, data: { pageType: 'crm' } },
        ],
        data: { pageType: 'crm' } 
      }
    ],
  },
  {
    path: 'admin/it-service/login',
    component: LoginComponent,
    data: { pageType: 'it-service' },
  },
  {
    path: 'admin/crm/login',
    component: LoginComponent,
    data: { pageType: 'crm' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
