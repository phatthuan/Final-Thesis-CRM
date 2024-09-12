import { Component, Input } from '@angular/core';
import { PersonService } from '../leads/persons.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { LeadsService } from '../leads/leads.service';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-update-contact-info-modal',
  templateUrl: './update-contact-info-modal.component.html',
  styleUrl: './update-contact-info-modal.component.scss'
})
export class UpdateContactInfoModalComponent {
  @Input() personId: string = "";
  @Input() name:string = "";
  @Input() emails:string = "";
  @Input() contactNumbers:string = "";
  private destroy$: Subject<void> = new Subject<void>();

  @Input() leadId!:string ;
  @Input() title!:string ;
  @Input() description!:string ;
  @Input() leadValue!:number ;
  @Input() status!: string ;
  @Input() score!:number ;
  @Input() lostReason!:string ;
  @Input() closedAt!:Date ;
  @Input() typeComponent!:string;

  @Input() customerId!:string;
  @Input() contactValue!:string;

  person: any = {};
  leads: any = {};
  customers: any = {};
  
  constructor(public activeModal: NgbActiveModal, private personService: PersonService, private leadService: LeadsService, private customerService:CustomerService) {}
  
  AddPerson(){
    this.person = {
      name: this.name,
      emails: this.emails,
      contactNumbers: this.contactNumbers
    }

    if(this.typeComponent!=="contact"){
      if(this.personId !== null && this.personId !== ""){
        console.log(this.personId);
        this.personService.updatePerson(this.person, this.personId).pipe(takeUntil(this.destroy$)).subscribe(
          (response) => {
            this.leads = {
              title: this.title,
              description: this.description,
              score: this.score,
              leadValue: this.leadValue,
              status: this.getStatusNumber(this.status),  
              lostReason: this.lostReason,
              closedAt: null,
              personId: this.personId,
            }
    
            this.leadService.updateLead(this.leads, this.leadId).pipe(takeUntil(this.destroy$)).subscribe(
              (response) => {
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                });
        
                Toast.fire({ icon: response.status, title: "Contact info has been updated successfully" }).then(
                  (result) => {
                    this.activeModal.close('Update');
                  }
                );
              },
              (error) => {
                console.error('Failed to update product: ID!null11', error);
              }
            );  
            
          },
          (error) => {
            console.error('Failed to update product: ID!null1', error);
          }
        );
      }else{
        this.personService.addPerson(this.person).pipe(takeUntil(this.destroy$)).subscribe(
          (response) => {
            this.leads = {
              title: this.title,
              description: this.description,
              score: this.score,
              leadValue: this.leadValue,
              status: this.getStatusNumber(this.status),  
              closedAt: null,
              lostReason: this.lostReason,
              personId: response.data.id,
            }
    
            this.leadService.updateLead(this.leads, this.leadId).pipe(takeUntil(this.destroy$)).subscribe(
              (response) => {
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                });
        
                Toast.fire({ icon: response.status, title: "Contact info has been updated successfully" }).then(
                  (result) => {
                    this.activeModal.close("update");
                  }
                );
  
              },
              (error) => {
                console.error('Failed to update product:ID=null', error);
              }
            );
    
          },
          (error) => {
            console.error('Failed to update product:ID=null', error);
          }
        );
      }
    }else{
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
              closedAt: null,
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
        
                Toast.fire({ icon: response.status, title: "Contact info has been updated successfully" }).then(
                  (result) => {
                    this.activeModal.close('Update');
                  }
                );
              },
              (error) => {
                console.error('Failed to update contact: ID!null', error);
              }
            );  
          },
          (error) => {
            console.error('Failed to update contact: ID!null', error);
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
              closedAt: null,
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
        
                Toast.fire({ icon: response.status, title: "Contact info has been updated successfully" }).then(
                  (result) => {
                    this.activeModal.close("update");
                  }
                );
  
              },
              (error) => {
                console.error('Failed to update contact:ID=null', error);
              }
            );
    
          },
          (error) => {
            console.error('Failed to update contact:ID=null', error);
          }
        );
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
}
