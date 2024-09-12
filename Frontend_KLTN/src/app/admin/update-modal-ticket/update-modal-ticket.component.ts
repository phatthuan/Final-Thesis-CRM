import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from '../tickets/ticket.service';
import { Contacts } from '../contact/contacts';
import { ContactsService } from '../contact/contact.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-modal-ticket',
  templateUrl: './update-modal-ticket.component.html',
  styleUrl: './update-modal-ticket.component.scss'
})

export class UpdateModalTicketComponent {
  @Input()ticketId!: string; 
  ticket:any = {};
  @Input()ticketName?: string;
  @Input()description?: string;
  @Input()priority?: string;
  @Input()nameRequester?: string;
  @Input()assignedName?: string;
  @Input()type?: string;
  @Input()status?: string;
  @Input()isLoading: boolean = false;
  @Input()userId?: string;
  @Input()assignedToUserId?: string;
  private destroy$: Subject<void> = new Subject<void>();
  
  contacts: Contacts[] = [];
  
  constructor(public activeModal: NgbActiveModal, private ticketService: TicketService, private contactService: ContactsService) {}

  ngOnInit() {
    this.getContacts();
  }

  updateTicket(): void {
    this.isLoading = true;
    this.ticket = {
      subject: this.ticketName,
      description: this.description,
      priority: this.getPriorityNumber(this.priority),
      requester: this.nameRequester,
      receiver: this.assignedName,
      type: this.type,
      status: this.getStatusNumber(this.status),  
      userId: this.userId,
      assignedToUserId: this.assignedToUserId
    }
    this.ticketService.updateTicket(this.ticket, this.ticketId).pipe(takeUntil(this.destroy$)).subscribe(
      (response) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: response.status, title: "Ticket has been updated successfully" }).then(
          (result) => {
            this.activeModal.close('Update');
          }
        );
      },
      (error) => {
        console.error('Failed to update product:', error);
        this.isLoading = false;
      }
    );
  }

  getContacts(){
    this.contactService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if(data.status === "success"){
          for(let element of data.data){
            if(element.role === 2){
              this.contacts.push(element);
            }
          }
        }
      },
      (error) => {
        console.log('Error');
      }
    );
  }

  getAssignedUserName(id:string){
    this.contactService.getContactById(id).pipe(takeUntil(this.destroy$)).subscribe(
      (data) =>{
        if(data.status === "success"){
          return data.data.firstName + data.data.lastName;
        }
      },
      (error)=>{

      }
    );
  }

  getPriorityNumber(priority: string | undefined): number {
    switch (priority) {
      case 'Low':
        return 0;
      case 'Medium':
        return 1;
      case 'High':
        return 3;
      default:
        return -1;
    }
  }

  getStatusNumber(priority: string | undefined): number {
    switch (priority) {
      case 'New':
        return 0;
      case 'In-progress':
        return 1;
      case 'Done':
        return 2;
      default:
        return -1;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
