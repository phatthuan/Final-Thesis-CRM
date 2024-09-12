import { Component } from '@angular/core';
import { AcitivityService } from '../activities/activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificationService } from '../notifications/notifications.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.scss'
})
export class AddActivityComponent {
    title:string = "";
    type:string = "";
    comment:string = "";
    scheduleFrom!: Date;
    scheduleTo!:Date;
    isDone:Boolean = true;
    location:string = "";
    pageType:string = "";
    sendToEmail:string = "";
    private destroy$: Subject<void> = new Subject<void>();
  constructor(private activityService: AcitivityService, private router: Router, private route:ActivatedRoute, private notification:NotificationService) {}

  addActivity(){
    // const activity = {
    //   title:this.title,
    //   type:this.type,
    //   comment:this.comment,
    //   scheduleFrom: this.scheduleFrom,
    //   scheduleTo: this.scheduleTo,
    //   isDone:this.isDone,
    //   location:this.location,
    //   sendToEmail:this.sendToEmail
      
    // };

    const emailRequest = {
      title : this.title,
      comment: this.comment,
      sendToEmail: this.sendToEmail
    }

    this.activityService.sendToEmail(emailRequest).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if(data.status === 'success'){
          const noti = {
            title:"Activity was added",
            description:`The promotion email was sent to ${this.sendToEmail}.`,
            userId:null,
            ticketId:null,
            activityId:data.id,
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
  
          Toast.fire({ icon: data.status, title: data.message }).then((result) => {
            this.backToPreviousPage();
          });
        }
        
      },
      error => {
        // console.error('Failed to add product:', error);

        const noti = {
          title:"Activity was added",
          description:`The promotion email was sent to ${this.sendToEmail}.`,
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

        Toast.fire({ icon: 'success', title: 'The activities was created successfully' }).then((result) => {
          this.backToPreviousPage();
        });
      }
    );
  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/activities/`]);
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
