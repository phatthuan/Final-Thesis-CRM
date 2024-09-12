  import { Component } from '@angular/core';
  import { Calendar } from './calendar';
  import { Subject } from 'rxjs';
  import { AcitivityService } from '../activities/activities.service';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { ActivatedRoute, Router } from '@angular/router';

  @Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
  })
  export class CalendarComponent {
    items: Calendar[]= [];
    pageType!:string;
    loading = true;

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
      private calendarService: AcitivityService,
      private modalService: NgbModal,
      private router: Router,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.pageType = this.route.snapshot.data['pageType'] || '';
      
      if(sessionStorage.getItem('admin-token') === null){
        this.router.navigate([`/admin/${this.pageType}/login`]);
      }
      this.loading = true;
    
    }

    onIframeLoad(): void {
      this.loading = false;
    }

    AddEvent(){ 
      this.router.navigate([`/admin/${this.pageType}/event/new`], {
        queryParams: { pageType: this.pageType }
      });
    }
  }
