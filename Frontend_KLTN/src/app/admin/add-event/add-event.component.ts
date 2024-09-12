import { Component } from '@angular/core';
import { AcitivityService } from '../activities/activities.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from '../notifications/notifications.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  summary: string = "";
  description: string = "";
  dateScheduleFrom: string = ""; 
  dateScheduleTo: string = "";
  location: string = "";
  attendee: string[] = [];
  pageType: string ="";

  private destroy$: Subject<void> = new Subject<void>();
  constructor( private calendarService: AcitivityService , private router: Router,private route: ActivatedRoute, private notification:NotificationService) {}

  addEvent(){
    const event = {
      summary  : this.summary,
      description  : this.description,
      dateScheduleFrom  : this.dateScheduleFrom, 
      dateScheduleTo  : this.dateScheduleTo,
      location  : this.location,
      attendee : this.attendee,
    };
    
    this.calendarService.addEvent(event).pipe(takeUntil(this.destroy$)).subscribe(
      data => {

        const noti = {
          title:"Event is created",
          description:`The Event is created successfully.`,
          userId:null,
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

        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });
        

        Toast.fire({ icon: data.status, title: "Event has been created succesfully." }).then((result) => {
          this.backToPreviousPage();
        });
        this.backToPreviousPage();
      },
      error => {
        console.error('Failed to add event:', error);
        this.backToPreviousPage();
      }
    );
  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/calendar/`]);
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
