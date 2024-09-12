import { Component } from '@angular/core';
import { Leads } from './leads';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { LeadsService } from './leads.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleUp, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { DeleteModalLeadComponent } from '../delete-modal-lead/delete-modal-lead.component';
import { UpdateModalLeadComponent } from '../update-modal-lead/update-modal-lead.component';
import { Subject, takeUntil } from 'rxjs';
import { PersonService } from './persons.service';
import { UpdateContactInfoModalComponent } from '../update-contact-info-modal/update-contact-info-modal.component';
import { Config } from 'datatables.net';
import Swal from 'sweetalert2';
import { ConvertLeadToCustomerModalComponent } from '../convert-lead-to-customer-modal/convert-lead-to-customer-modal.component';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent {
  items: Leads[] = [];
  loading = true;
  pageType!:string;
  faSyncAlt = faSyncAlt;
  
  filteredItems: any = [];
  searchTerm: string = '';

  sortColumn: string = '';
  sortDirection: boolean = true;

  private destroy$: Subject<void> = new Subject<void>();
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(library: FaIconLibrary,private leadsService: LeadsService,private modalService: NgbModal, private router: Router,private route: ActivatedRoute, private personService: PersonService) {
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
    
    this.getLeads();
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

  getLeads(){
    this.leadsService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        if(res.status === "success"){
          this.items = res.data;
          const response:any = res.data;
          this.loading  = false;
          for(let i = 0; i < response.length ; i++){
            if(response[i].leadValue >= 100){
              this.convertLeadToContact(response[i].id, response[i].id);
            }
          }

          this.dtTrigger.next(null);
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

        Toast.fire({ icon: "error", title: "Lead has been loaded unsuccessfully." });
      }
    );
  }

  getStatusLabel(priority: number): string {
    switch (priority) {
      case 0:
        return 'Success';
      case 1:
        return 'Following';
      case 2:
        return 'Fail';
      default:
        return 'Unknown';
    }
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

  AddLead() {
    this.router.navigate([`/admin/${this.pageType}/leads/new`], {
      queryParams: { pageType: this.pageType }
    });
  }

  openDeleteConfirmation(itemId: string) {
    const modalRef = this.modalService.open(DeleteModalLeadComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message =
      'Are you sure you want to delete this item?';
    modalRef.componentInstance.itemId = itemId;

    modalRef.result
      .then((itemIdToDelete) => {
        if (itemIdToDelete) {
          this.leadsService.deleteLead(itemIdToDelete).pipe(takeUntil(this.destroy$)).subscribe(
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

  convertLeadToContact(id:string,personId:string){
    const modalRef = this.modalService.open(ConvertLeadToCustomerModalComponent);
    modalRef.componentInstance.title = 'Promote to customer Confirmation';
    modalRef.componentInstance.message =
      'Are you sure you want to promote this lead to customer?';
    modalRef.componentInstance.itemId = id;

    modalRef.result
      .then((itemIdToPromote) => {
        if (itemIdToPromote) {
          let customer;
          this.leadsService.getLeadById(id).pipe(takeUntil(this.destroy$)).subscribe(
            (res: any) => {
              customer = {
                title: res.data.title,
                description: res.data.description,
                score: res.data.score,
                leadValue: res.data.leadValue,
                status: res.data.status,  
                lostReason: res.data.lostReason,
                // closedAt: res.data.closedAt,
                leadId: id,
                personId: personId
              }

              this.leadsService.convertListToContact(customer).pipe(takeUntil(this.destroy$)).subscribe(
                (res:any)=>{
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                  });
          
                  Toast.fire({ icon: res.status, title: "This lead has enough value to become our customer." }).then((result) => {
                    this.refreshItemList();
                  });
                },
                (err:any)=>{

                }
              )

            },
            (error: any) => {
              sessionStorage.clear();
              this.router.navigate([`/admin/${this.pageType}/login`]);
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

  openUpdateModal(leadId: string): void {
    this.leadsService.getLeadById(leadId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        console.log(response);
        const modalRef = this.modalService.open(UpdateModalLeadComponent, {
          centered: true,
        });

        modalRef.componentInstance.leadId = leadId;
        modalRef.componentInstance.title = response.data.title;
        modalRef.componentInstance.description = response.data.description;
        modalRef.componentInstance.leadValue = response.data.leadValue;
        modalRef.componentInstance.status = this.getStatusLabel(response.data.status);
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

  openUpdateInfoModal(personId:string, leadId:string, update_type:string){
    if(personId !== null && personId !== ""){
      this.personService.getPersonById(personId).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          console.log(response);
          const modalRef = update_type === "update_contact_info" ? this.modalService.open(UpdateContactInfoModalComponent, {
            centered: true,
          }) : this.modalService.open(UpdateModalLeadComponent, {
            centered: true,
          });

          modalRef.componentInstance.personId = personId;
          modalRef.componentInstance.name = response.data.name;
          modalRef.componentInstance.emails = response.data.emails;
          modalRef.componentInstance.contactNumbers = response.data.contactNumbers;

          this.leadsService.getLeadById(leadId).pipe(takeUntil(this.destroy$)).subscribe(
            (response: any) => {
              modalRef.componentInstance.leadId = leadId;
              modalRef.componentInstance.title = response.data.title;
              modalRef.componentInstance.description = response.data.description;
              modalRef.componentInstance.leadValue = response.data.leadValue;
              modalRef.componentInstance.status = this.getStatusLabel(response.data.status);
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

      this.leadsService.getLeadById(leadId).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          modalRef.componentInstance.leadId = leadId;
          modalRef.componentInstance.title = response.data.title;
          modalRef.componentInstance.description = response.data.description;
          modalRef.componentInstance.leadValue = response.data.leadValue;
          modalRef.componentInstance.status = this.getStatusLabel(response.data.status);
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
