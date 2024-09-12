import { Component } from '@angular/core';
import { LeadsService } from '../leads/leads.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { PersonService } from '../leads/persons.service';
import { NotificationService } from '../notifications/notifications.service';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrl: './add-lead.component.scss'
})
export class AddLeadComponent {
  id:string = "";
  title:string = "";
  description:string = "";
  leadValue:number = 0;
  status: string = "";
  score:number = 0;
  lostReason:string = "";
  closedAt:Date = new Date();
  pageType:string='';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private leadsService: LeadsService, private router: Router, private route:ActivatedRoute, private personService:PersonService, private notification:NotificationService) {}
  name: string = "";
  emails: string = "";
  contactNumbers: string = "";
  person: any = {};
  personId:string = "";

  addLead(){
    this.person = {
      name: this.name,
      emails: this.emails,
      contactNumbers: this.contactNumbers
    }

    let dialogtitle = "Lead has been created succesfully."

    if(this.leadValue >= 100){
      dialogtitle = "This lead has enough value to become our customer."
    }

    this.personService.addPerson(this.person).pipe(takeUntil(this.destroy$)).subscribe(
      (response) => {
        const lead = {
          title: this.title,
          description: this.description,
          score: this.score,
          leadValue: this.leadValue,
          status: this.status,  
          lostReason: this.lostReason,
          closedAt: this.closedAt,
          personId: response.data.id,
        };

        this.leadsService.addLead(lead).pipe(takeUntil(this.destroy$)).subscribe(
          data => {
            const noti = {
              title:"Lead is registered",
              description:`The Lead is registered successfully.`,
              userId:null,
              ticketId:null,
              activityId:null,
              quoteId:null,
              productId:null,
              leadId:data.data.id
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
    
            Toast.fire({ icon: data.status, title: dialogtitle }).then((result) => {
              this.backToPreviousPage();
            });
          },
          error => {
            console.error('Failed to add lead:', error);
          }
        );
      });

  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/leads/`]);
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
