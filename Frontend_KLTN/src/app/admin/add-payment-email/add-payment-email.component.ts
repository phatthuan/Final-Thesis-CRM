import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AcitivityService } from '../activities/activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-payment-email',
  templateUrl: './add-payment-email.component.html',
  styleUrl: './add-payment-email.component.scss'
})
export class AddPaymentEmailComponent {
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
  constructor(private activityService: AcitivityService, private router: Router, private route:ActivatedRoute) {}

  addActivity(){
    const activity = {
      title:this.title,
      type:this.type,
      comment:this.comment,
      scheduleFrom: this.scheduleFrom,
      scheduleTo: this.scheduleTo,
      isDone:this.isDone,
      location:this.location,
      sendToEmail:this.sendToEmail
      
    };
    this.activityService.sendToEmail(activity).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if(data.status === 'success'){
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
        console.error('Failed to send email:', error);
      }
    );
  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/quotes/`]);
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
