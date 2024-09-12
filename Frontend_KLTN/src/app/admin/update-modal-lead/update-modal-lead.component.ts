import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadsService } from '../leads/leads.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { PersonService } from '../leads/persons.service';

@Component({
  selector: 'app-update-modal-lead',
  templateUrl: './update-modal-lead.component.html',
  styleUrl: './update-modal-lead.component.scss'
})
export class UpdateModalLeadComponent {
  @Input() leadId!:string ;
  @Input() title!:string ;
  @Input() description!:string ;
  @Input() leadValue!:number ;
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
  leads: any = {};

  constructor(public activeModal: NgbActiveModal, private leadService: LeadsService, private personService : PersonService) {}

  updateLead(){
    this.person = {
      name: this.name,
      emails: this.emails,
      contactNumbers: this.contactNumbers
    }

    if(this.personId !== null && this.personId !== ""){
      console.log(this.personId);
      this.personService.updatePerson(this.person, this.personId).pipe(takeUntil(this.destroy$)).subscribe(
        (response) => {
          this.leads = {
            title: this.title,
            description: this.description,
            score: this.score,
            leadValue: this.leadValue,
            status: this.status,  
            lostReason: this.lostReason,
            closedAt: this.closedAt,
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
      
              Toast.fire({ icon: response.status, title: "Lead has been updated successfully" }).then(
                (result) => {
                  this.activeModal.close('Update');
                }
              );
            },
            (error) => {
              console.error('Failed to update Leads: ID!null1', error);
            }
          );  
        },
        (error) => {
          console.error('Failed to update Leads: ID!null2', error);
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
            status: this.status,  
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
      
              Toast.fire({ icon: response.status, title: "Lead has been updated successfully" }).then(
                (result) => {
                  this.activeModal.close("update");
                }
              );

            },
            (error) => {
              console.error('Failed to update Leads:ID=null3', error);
            }
          );
  
        },
        (error) => {
          console.error('Failed to update Leads:ID=null4', error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
