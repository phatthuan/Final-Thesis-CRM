import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/admin/tickets/ticket.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

interface ErrorMessage {
  type: string;
  message: string;
}

@Component({
  selector: 'app-add-ticket-modal',
  templateUrl: './add-ticket-modal.component.html',
  styleUrl: './add-ticket-modal.component.scss'
})
export class AddTicketModalComponent {
  ticketName: string = '';
  description: string = '';
  priority: string = '';
  nameRequester?: string = '';
  assignedName: string = '';
  type: string = 'Default';
  status: string = '';
  userId: string = '';
  assignedToUserId:string = 'a49bec09-6e51-4d6a-8dfb-948d98be485b';
  constructor(public activeModal: NgbActiveModal, private ticketService: TicketService, private userService: UserService, private snackBar: MatSnackBar) {}
  error:ErrorMessage[] = []; 
  private destroy$: Subject<void> = new Subject<void>();

  addTicket(){
    const ticket = {
      subject: this.ticketName,
      description: this.description,
      priority: 1,
      requester: this.userService.getUserName(),
      receiver: '',
      type: this.type,
      status: 0,
      userId: this.userService.getUserId(),
      assignedToUserId: this.assignedToUserId
    };
    // response.data.message
    this.ticketService.addTicket(ticket).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.userService.getMessage().pipe(takeUntil(this.destroy$)).subscribe(
          (response) => {
            const Toast = Swal.mixin({
              position: 'center',
              showConfirmButton: true,
              timer: 2000,
              timerProgressBar: true,
            });
            Toast.fire({ icon: response.status, title: response.message }).then((result)=>{
              this.activeModal.close('Add');
            });
          },
          (error) => {
            console.error('Failed to get message:', error);
          }
        )
      },
      (error) => {
        console.error('Failed to add ticket:', error);
      }
    );
  }
  
  validateSubject(subject:string){
    return subject.replace(/ /g, "").length === 0
  }
  
  validateType(type: string){
    return type !== "Request" && type !== "Support";
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
