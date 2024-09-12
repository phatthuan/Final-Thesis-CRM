import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from '../notifications/notifications.service';
import { PersonService } from '../leads/persons.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent {
  id:string = "";
  title:string = "";
  description:string = "";
  contactValue:number = 0;
  status: string = "";
  score:number = 0;
  lostReason:string = "";
  closedAt:Date = new Date();
  pageType:string='';

  name: string = "";
  emails: string = "";
  contactNumbers: string = "";
  person: any = {};
  personId:string = "";
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private customerService: CustomerService, private router: Router, private route:ActivatedRoute, private notification:NotificationService, private personService: PersonService) {}


  addCustomer(){
    this.person = {
      name: this.name,
      emails: this.emails,
      contactNumbers: this.contactNumbers
    }

    this.personService.addPerson(this.person).pipe(takeUntil(this.destroy$)).subscribe(
      (response) => {
        const customer = {
          title: this.title,
          description: this.description,
          score: this.score,
          contactValue: this.contactValue,
          status: this.status,  
          lostReason: "",
          closedAt: this.closedAt,
          personId: response.data.id,
          
        };

        this.customerService.addCustomer(customer).pipe(takeUntil(this.destroy$)).subscribe(
          data => {
            const Toast = Swal.mixin({
              position: 'center',
              showConfirmButton: true,
              timer: 2000,
              timerProgressBar: true,
            });
    
            const noti = {
              title:"Customer is registered",
              description:`The customer is registered successfully.`,
              userId:data.data.id,
              ticketId:null,
              activityId:null,
              quoteId:null,
              productId:null,
              leadId:null
            };
          this.notification.addNotification(noti).pipe(takeUntil(this.destroy$)).subscribe(
            data => {
              console.log(data);
            }, 
            err => {
              console.log(err);
            }
          );
    
            Toast.fire({ icon: data.status, title: "Customer has been created succesfully." }).then((result) => {
              this.backToPreviousPage();
            });
          },
          error => {
            console.error('Failed to add product:', error);
          }
        );
      });
    

    
  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/customers/`]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
    });
    
     if(sessionStorage.getItem('admin-token') === null){
      this.router.navigate([`/admin/${this.pageType}/login`]);
    }
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
