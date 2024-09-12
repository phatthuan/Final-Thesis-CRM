import { Component } from '@angular/core';
import { Contacts } from './contacts';
import { ContactsService } from './contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalContactComponent } from '../delete-modal-contact/delete-modal-contact.component';
import { UpdateModalContactComponent } from '../update-modal-contact/update-modal-contact.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ImageFile } from 'src/app/user/imageFile';
import Swal from 'sweetalert2';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  items: Contacts[] = [];
  pageType!:string;
  sortColumn: string = '';
  sortDirection: boolean = true;
  loading = true;

  filteredItems: any = [];
  searchTerm: string = '';

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private contactService: ContactsService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    
    this.getContacts();
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

  getContacts() {
    this.contactService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.items = res.data;
          this.filteredItems = res.data;
          this.dtTrigger.next(null);
          this.loading = false;
        }
      },
      (error) => {
        // sessionStorage.clear();
        console.log(error);
        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: "error", title: "Contact has been loaded unsuccessfully." });
      }
    );
  }

  AddContact() {
    this.router.navigate([`/admin/${this.pageType}/contacts/new`], {
      queryParams: { pageType: this.pageType }
    });
  }

  openDeleteConfirmation(itemId: string) {
    const modalRef = this.modalService.open(DeleteModalContactComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message =
      'Are you sure you want to delete this item?';
    modalRef.componentInstance.itemId = itemId;

    modalRef.result
      .then((itemIdToDelete) => {
        if (itemIdToDelete) {
          this.contactService.deleteContact(itemIdToDelete).pipe(takeUntil(this.destroy$)).subscribe(
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

  openUpdateModal(contactId: string): void {
    this.contactService.getContactById(contactId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        console.log(response);
        const modalRef = this.modalService.open(UpdateModalContactComponent, {
          centered: true,
        });

        console.log(response.data.role);
        
        modalRef.componentInstance.contactId = contactId;
        modalRef.componentInstance.firstName = response.data.firstName;
        modalRef.componentInstance.lastName = response.data.lastName;
        modalRef.componentInstance.email = response.data.email;
        modalRef.componentInstance.phoneNumber = response.data.phoneNumber;
        modalRef.componentInstance.role = response.data.role;
        modalRef.componentInstance.imageFile = response.data.imageFile
        modalRef.componentInstance.imageId = response.data.imageId
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getImagePath(imageFile: ImageFile | undefined): string {
    return imageFile && imageFile.data ? `data:image/png;base64,${imageFile!.data}` : '';
  }
}
