import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleUp, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { TicketService } from './ticket.service';
import { Tickets } from './tickets';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalTicketComponent } from '../delete-modal-ticket/delete-modal-ticket.component';
import { UpdateModalTicketComponent } from '../update-modal-ticket/update-modal-ticket.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '../contact/contacts';
import { ContactsService } from '../contact/contact.service';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Config } from 'datatables.net';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/user/service/user.service';
import { map } from 'jquery';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent {
  items: Tickets[] = [];
  pageType!: string;
  faSyncAlt = faSyncAlt;
  loading = true;

  
  private destroy$: Subject<void> = new Subject<void>();
  
  filteredItems: any = [];
  searchTerm: string = '';

  sortColumn: string = '';
  sortDirection: boolean = true;
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(library: FaIconLibrary, private ticketService: TicketService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private contactService: ContactsService, private userService: UserService) {
    library.addIcons(faArrowAltCircleUp);
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
    
    this.getTickets();
  }

  getTickets() {
    this.ticketService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        if (res.status === "success") {
          this.items = res.data;
          this.filteredItems = res.data;

          this.items.forEach(ticket => {
            if (ticket.userId !== null ) {
              this.getUserName(ticket.userId).then(userName => {
                console.log(userName);
                ticket.requester = userName;
              });
            }
          });

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

        Toast.fire({ icon: "error", title: "Tickets has been loaded unsuccessfully." });
      }
    );
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

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 0:
        return 'Low';
      case 1:
        return 'Medium';
      case 2:
        return 'High';
      default:
        return 'Unknown';
    }
  }

  getStatusLabel(priority: number): string {
    switch (priority) {
      case 0:
        return 'New';
      case 1:
        return 'In-progress';
      case 2:
        return 'Done';
      default:
        return 'Unknown';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  AddTicket() {
    this.router.navigate([`/admin/${this.pageType}/tickets/new`], {
      queryParams: { pageType: this.pageType }
    });
  }

  openDeleteConfirmation(itemId: string) {
    const modalRef = this.modalService.open(DeleteModalTicketComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message =
      'Are you sure you want to delete this ticket?';
    modalRef.componentInstance.itemId = itemId;

    modalRef.result
      .then((itemIdToDelete) => {
        if (itemIdToDelete) {
          this.ticketService.deleteTicket(itemIdToDelete).pipe(takeUntil(this.destroy$)).subscribe(
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

  openUpdateModal(ticketId: string): void {
    this.ticketService.getTicketById(ticketId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        console.log(response);
        const modalRef = this.modalService.open(UpdateModalTicketComponent, {
          centered: true,
        });

        modalRef.componentInstance.ticketId = ticketId;
        modalRef.componentInstance.ticketName = response.data.subject;
        modalRef.componentInstance.description = response.data.description;
        modalRef.componentInstance.nameRequester = response.data.requesterEmail;
        modalRef.componentInstance.assignedName = response.data.receiver;
        modalRef.componentInstance.type = "Unknown";
        modalRef.componentInstance.status = this.getStatusLabel(response.data.status);
        modalRef.componentInstance.priority = this.getPriorityLabel(response.data.priority);
        modalRef.componentInstance.userId = response.data.userId;
        modalRef.result.then(
          (data) => {
            this.refreshItemList();
          },
          (error) => {
            console.log('Modal dismissed');
          }
        );
      },
      (error: any) => {
        sessionStorage.clear();
        this.router.navigate([`/admin/${this.pageType}/login`]);
      }
    );
  }

  getUserName(userId: string): Promise<string> {
    return new Promise((resolve) => {
      this.userService.getUserById(userId).pipe(takeUntil(this.destroy$)).subscribe(
        (res) => {
          if (res.status === "success") {
            resolve(res.data.firstName + ' ' + res.data.lastName); 
          } else if(res.status === "success" && res.data.role === '1') {
            resolve('Admin');
          } else {
            resolve('');
          }
        },
        (error) => {
          console.error(error);
          resolve('');
        }
      );
    });
  }

}
