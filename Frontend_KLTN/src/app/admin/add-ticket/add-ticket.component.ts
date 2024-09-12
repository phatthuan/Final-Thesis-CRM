import { Component } from '@angular/core';
import { TicketService } from '../tickets/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contact/contact.service';
import { Contacts } from '../contact/contacts';
import { UserService } from 'src/app/user/service/user.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificationService } from '../notifications/notifications.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.scss'
})
export class AddTicketComponent {
  ticketName: string = '';
  description: string = '';
  priority: string = '';
  nameRequester: string = '';
  assignedName: string = '';
  type: string = '';
  status: string = '';
  pageType:string='';
  userId?: string;
  assignedToUserId?:string;
  contacts: Contacts[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private notification:NotificationService,private ticketService: TicketService, private router: Router, private route:ActivatedRoute, private contactService: ContactsService, private userService : UserService) {}

  addTicket(){
    const ticket = {
      subject: this.ticketName,
      description: this.description,
      priority: this.getPriorityNumber(this.priority),
      requester: this.userService.getUserName(),
      receiver: this.assignedName,
      type: this.type,
      status: this.getStatusNumber(this.status),  
      userId: localStorage.getItem('admin-id'),
      assignedToUserId: this.assignedToUserId
      
    };
    this.ticketService.addTicket(ticket).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        const noti = {
          title:"Ticket is created",
          description:`The Ticket is created successfully.`,
          userId:null,
          ticketId:data.data.id,
          activityId:null,
          quoteId:null,
          productId:null,
          leadId:null
        };

        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: data.status, title: "Ticket has been created successfully." });

        this.notification.addNotification(noti).pipe(takeUntil(this.destroy$)).subscribe(
          data => {
            console.log(data);
          }, 
          err => {
            console.log(err);
          }
        );

        this.userService.getMessage().pipe(takeUntil(this.destroy$)).subscribe(
          (response) => {
            const Toast = Swal.mixin({
              position: 'center',
              showConfirmButton: true,
              timer: 2000,
              timerProgressBar: true,
            });
    
            Toast.fire({ icon: response.status, title: response.message });
          },
          (error) => {
            console.error('Failed to get message:', error);
          }
        )
        this.backToPreviousPage();
      },
      error => {
        console.error('Failed to add ticket:', error);
      }
    );
  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/tickets/`]);
  }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.pageType = params['pageType'];
    });
    
     if(sessionStorage.getItem('admin-token') === null){
      this.router.navigate([`/admin/${this.pageType}/login`]);
    }
    
    this.getContacts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
}

