import { Component } from '@angular/core';
import { Customer } from './customer';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from './customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleUp, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { DeleteModalCustomerComponent } from '../delete-modal-customer/delete-modal-customer.component';
import { UpdateModalCustomerComponent } from '../update-modal-customer/update-modal-customer.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { UpdateContactInfoModalComponent } from '../update-contact-info-modal/update-contact-info-modal.component';
import { PersonService } from '../leads/persons.service';
import Swal from 'sweetalert2';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  items: Customer[] = [];
  
  pageType!:string;
  faSyncAlt = faSyncAlt;
  
  filteredItems: any = [];
  searchTerm: string = '';

  sortColumn: string = '';
  sortDirection: boolean = true;

  id:string = "";
  title:string = "";
  description:string = "";
  contactValue:number = 0;
  status: string = "";
  score:number = 0;
  lostReason:string = "";
  closedAt:Date = new Date();

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  loading = true;

  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(library: FaIconLibrary,private customerService: CustomerService,private modalService: NgbModal, private router: Router,private route: ActivatedRoute, private personService: PersonService) {
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
    
    this.getCustomers();
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

  getSortClass(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection ? 'asc' : 'desc';
    }
    return '';
  }
  
  getCustomers(){
    this.customerService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        if(res.status === "success"){
          console.log(res.data);
          this.items = res.data;
          this.filteredItems = res.data;
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

  AddCustomer() {
    this.router.navigate([`/admin/${this.pageType}/customers/new`], {
      queryParams: { pageType: this.pageType }
    });
  }
  
  openDeleteConfirmation(itemId: string) {
    const modalRef = this.modalService.open(DeleteModalCustomerComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message =
      'Are you sure you want to delete this item?';
    modalRef.componentInstance.itemId = itemId;

    modalRef.result
      .then((itemIdToDelete) => {
        if (itemIdToDelete) {
          this.customerService.deleteCustomer(itemIdToDelete).pipe(takeUntil(this.destroy$)).subscribe(
            (res) => {
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

  openUpdateModal(customerId: string): void {
    this.customerService.getCustomerById(customerId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        console.log(response);
        const modalRef = this.modalService.open(UpdateModalCustomerComponent, {
          centered: true,
        });

        modalRef.componentInstance.customerId = customerId;
        modalRef.componentInstance.title = response.data.title;
        modalRef.componentInstance.description = response.data.description;
        modalRef.componentInstance.contactValue = response.data.contactValue;
        modalRef.componentInstance.status = response.data.status;
        modalRef.componentInstance.score = response.data.score;
        modalRef.componentInstance.lostReason = response.data.lostReason;
        modalRef.componentInstance.closedAt = response.data.closedAt;
        modalRef.result.then(
          (data) => {
            console.log(data);
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
  
  openUpdateInfoModal(personId:string, customerId:string, update_type:string){
    if(personId !== null && personId !== ""){
      this.personService.getPersonById(personId).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          console.log(response);
          const modalRef = update_type === "update_contact_info" ? this.modalService.open(UpdateContactInfoModalComponent, {
            centered: true,
          }) : this.modalService.open(UpdateModalCustomerComponent, {
            centered: true,
          });
  
          modalRef.componentInstance.personId = personId;
          modalRef.componentInstance.name = response.data.name;
          modalRef.componentInstance.emails = response.data.emails;
          modalRef.componentInstance.contactNumbers = response.data.contactNumbers;
          modalRef.componentInstance.typeComponent = "contact";
  
          this.customerService.getCustomerById(customerId).pipe(takeUntil(this.destroy$)).subscribe(
            (response: any) => {
              modalRef.componentInstance.customerId = customerId;
              modalRef.componentInstance.title = response.data.title;
              modalRef.componentInstance.description = response.data.description;
              modalRef.componentInstance.contactValue = response.data.contactValue;
              modalRef.componentInstance.status = response.data.status;
              modalRef.componentInstance.score = response.data.score;
              modalRef.componentInstance.lostReason = response.data.lostReason;
              modalRef.componentInstance.closedAt = response.data.closedAt;

              modalRef.result.then(
                (data) => {
                  console.log(data);
                  // this.refreshItemList();
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
        },
        (error: any) => {
          sessionStorage.clear();
          this.router.navigate([`/admin/${this.pageType}/login`]);
        }
      );
    }else{
      const modalRef = this.modalService.open(UpdateContactInfoModalComponent, {
        centered: true,
      });

      this.customerService.getCustomerById(customerId).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          modalRef.componentInstance.customerId = customerId;
          modalRef.componentInstance.title = response.data.title;
          modalRef.componentInstance.description = response.data.description;
          modalRef.componentInstance.contactValue = response.data.contactValue;
          modalRef.componentInstance.status = response.data.status;
          modalRef.componentInstance.score = response.data.score;
          modalRef.componentInstance.lostReason = response.data.lostReason;
          modalRef.componentInstance.closedAt = response.data.closedAt;

          modalRef.result.then(
            (data) => {
              setTimeout(()=>{
                this.refreshItemList();
              }, 2000)
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
      // modalRef.result.then(
      //   (data) => {
      //     this.refreshItemList();
      //   },
      //   (error) => {
      //     console.log('Modal dismissed');
      //   }
      // );
    }
    
  }

  
  getStatusNumber(priority: string | undefined): number {
    switch (priority) {
      case 'New':
        return 0;
      case 'In-progress':
        return 1;
      case 'Done':
        return 3;
      default:
        return -1;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
