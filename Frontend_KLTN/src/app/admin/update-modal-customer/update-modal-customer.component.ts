import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { PersonService } from '../leads/persons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-modal-customer',
  templateUrl: './update-modal-customer.component.html',
  styleUrl: './update-modal-customer.component.scss'
})
export class UpdateModalCustomerComponent {
  @Input() customerId!:string ;
  @Input() title!:string ;
  @Input() description!:string ;
  @Input() contactValue!:number ;
  @Input() status!: string ;
  @Input() score!:number ;
  @Input() lostReason!:string ;
  @Input() closedAt!:Date ;
  @Input() isLoading!:boolean ;

  @Input() personId: string = "";
  @Input() name:string = "";
  @Input() emails:string = "";
  @Input() contactNumbers:string = "";

  private destroy$: Subject<void> = new Subject<void>();
  
  person: any = {};
  customers: any = {};

  constructor(public activeModal: NgbActiveModal, private customerService: CustomerService, private personService : PersonService) {}

  updateCustomer(){
    this.person = {
      name: this.name,
      emails: this.emails,
      contactNumbers: this.contactNumbers
    }

    if(this.personId !== null && this.personId !== ""){
      console.log(this.personId);
      this.personService.updatePerson(this.person, this.personId).pipe(takeUntil(this.destroy$)).subscribe(
        (response) => {
          this.customers = {
            title: this.title,
            description: this.description,
            score: this.score,
            contactValue: this.contactValue,
            status: this.status,  
            lostReason: this.lostReason,
            closedAt: this.closedAt,
            personId: this.personId,
          }
  
          this.customerService.updateCustomer(this.customers, this.customerId).pipe(takeUntil(this.destroy$)).subscribe(
            (response) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
      
              Toast.fire({ icon: response.status, title: "Customer has been updated successfully" }).then(
                (result) => {
                  this.activeModal.close('Update');
                }
              );
            },
            (error) => {
              console.error('Failed to update customers: ID!null', error);
            }
          );  
        },
        (error) => {
          console.error('Failed to update customers: ID!null', error);
        }
      );
    }else{
      this.personService.addPerson(this.person).pipe(takeUntil(this.destroy$)).subscribe(
        (response) => {
          this.customers = {
            title: this.title,
            description: this.description,
            score: this.score,
            contactValue: this.contactValue,
            status: this.status,  
            lostReason: this.lostReason,
            personId: response.data.id,
          }
  
          this.customerService.updateCustomer(this.customers, this.customerId).pipe(takeUntil(this.destroy$)).subscribe(
            (response) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
      
              Toast.fire({ icon: response.status, title: "Customer has been updated successfully" }).then(
                (result) => {
                  this.activeModal.close("update");
                }
              );

            },
            (error) => {
              console.error('Failed to update customer:ID=null', error);
            }
          );
  
        },
        (error) => {
          console.error('Failed to update customer:ID=null', error);
        }
      );
    }
  }

  getStatusNumber(priority: string | undefined): number {
    switch (priority) {
      case 'New':
        return 0;
      case 'In-progress':
        return 1;
      case 'Done':
        return 3;
      default:
        return -1;
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
