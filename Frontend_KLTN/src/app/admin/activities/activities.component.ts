import { Component } from '@angular/core';
import { Activities } from './activities';
import { AcitivityService } from './activities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleUp, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { DeleteModalActivityComponent } from '../delete-modal-activity/delete-modal-activity.component';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CreateFbPostComponent } from '../create-fb-post/create-fb-post.component';
import Swal from 'sweetalert2';
import { PostYtVideoComponent } from '../post-yt-video/post-yt-video.component';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  items: Activities[] = [];
  pageType!:string;
  faSyncAlt = faSyncAlt;
  
  filteredItems: any = [];
  searchTerm: string = '';

  sortColumn: string = '';
  sortDirection: boolean = true;

  private destroy$: Subject<void> = new Subject<void>();
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  loading = true;
  
  constructor(library: FaIconLibrary,private activityService: AcitivityService,private modalService: NgbModal, private router: Router,private route: ActivatedRoute, private snackBar: MatSnackBar) {
    library.addIcons(faArrowAltCircleUp);

  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }

    this.filteredItems.sort((a: any, b: any) => {
      let valueA = a[column];
      let valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return this.sortDirection ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  filterItems(): void {
    if (!this.searchTerm) {
      this.filteredItems = this.items;
      return;
    }

    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    this.filteredItems = this.items.filter(item => 
      Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }

  getSortClass(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection ? 'asc' : 'desc';
    }
    return '';
  }

  ngOnInit() {
    this.pageType = this.route.snapshot.data['pageType'] || '';
    
     if(sessionStorage.getItem('admin-token') === null){
      this.router.navigate([`/admin/${this.pageType}/login`]);
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      ordering: true,
      language: {
        searchPlaceholder: 'Search'
      },
    }
    this.getActivities();
  }

  getActivities(){
    this.activityService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if(data.status === "success"){
          this.filteredItems = data.data;
          this.items = data.data;
          this.dtTrigger.next(null);
          this.loading = false;
        }
      },
      (error) => {
        console.log(error);
        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: "error", title: "Customer has been loaded unsuccessfully." });
      }
    );
  }

  AddActivity() {
    this.router.navigate([`/admin/${this.pageType}/activities/new`], {
      queryParams: { pageType: this.pageType }
    });
  }

  openDeleteConfirmation(itemId: string) {
    const modalRef = this.modalService.open(DeleteModalActivityComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message =
      'Are you sure you want to delete this item?';
    modalRef.componentInstance.itemId = itemId;

    modalRef.result
      .then((itemIdToDelete) => {
        if (itemIdToDelete) {
          this.activityService.deleteActivity(itemIdToDelete).pipe(takeUntil(this.destroy$)).subscribe(
            (response) => {
              this.refreshItemList();
            },
            (error) => {
              console.error('Failed to delete item:', error);
            }
          );
        }
      })
      .catch((error) => {
        console.log('Modal dismissed:', error);
      });
  }

  refreshItemList() {
    window.location.reload();
  }

  createFBPost(){
    const modalRef = this.modalService.open(CreateFbPostComponent, {
      centered: true,
    });

    modalRef.result.then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('Modal dismissed');
      }
    );
  }

  postYTVideo(){
    const modalRef = this.modalService.open(PostYtVideoComponent, {
      centered: true,
    });

    modalRef.result.then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('Modal dismissed');
      }
    );
  }


  sendEmail(activitiesId: string, title:string, content: string, email:string){
    const emailRequest = {
      id : activitiesId,
      title : title,
      comment: content,
      sendToEmail: email
    }
    this.activityService.sendToEmail(emailRequest).pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        const config = new MatSnackBarConfig();
        config.duration = 3000;
        config.verticalPosition = 'top';
        config.panelClass = ['custom-snackbar'];

        this.snackBar.open("The email is sent successfully", 'Close', config);
        console.log(res);
      },
      (err) => {
        console.error("Cannot send email. Error: " + err);
      }
    )
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

