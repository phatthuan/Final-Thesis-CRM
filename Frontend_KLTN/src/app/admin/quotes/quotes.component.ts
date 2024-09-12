import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { QuotesService } from './quotes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { DeleteModalQuoteComponent } from '../delete-modal-quote/delete-modal-quote.component';
import { UpdateModalQuoteComponent } from '../update-modal-quote/update-modal-quote.component';
import { Quotes } from './quotes';
import { Subject, takeUntil } from 'rxjs';
import { Config } from 'datatables.net';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {
  items: Quotes[] = [];
  pageType!:string;
  private destroy$: Subject<void> = new Subject<void>();

  filteredItems: any = [];
  searchTerm: string = '';

  sortColumn: string = '';
  sortDirection: boolean = true;
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  loading = true;

  constructor(library: FaIconLibrary,private quoteService: QuotesService,private modalService: NgbModal, private router: Router,private route: ActivatedRoute) {
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
    this.getQuotes();
  }

  getQuotes(){
    this.quoteService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if(data.status === "success"){
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

        Toast.fire({ icon: "error", title: "Quotes have not been loaded." });
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

  AddQuote() {
    this.router.navigate([`/admin/${this.pageType}/quotes/new`], {
      queryParams: { pageType: this.pageType }
    });
  }

  openDeleteConfirmation(itemId: string) {
    const modalRef = this.modalService.open(DeleteModalQuoteComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message =
      'Are you sure you want to delete this item?';
    modalRef.componentInstance.itemId = itemId;

    modalRef.result
      .then((itemIdToDelete) => {
        if (itemIdToDelete) {
          this.quoteService.deleteQuote(itemIdToDelete).pipe(takeUntil(this.destroy$)).subscribe(
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

  openUpdateModal(quoteId: string): void {
    this.quoteService.getQuoteById(quoteId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        console.log(response);
        const modalRef = this.modalService.open(UpdateModalQuoteComponent, {
          centered: true,
        });

        modalRef.componentInstance.quoteId = quoteId;
        modalRef.componentInstance.subject = response.data.subject;
        modalRef.componentInstance.description = response.data.description;
        modalRef.componentInstance.billingAddress = response.data.billingAddress;
        modalRef.componentInstance.shippingAddress = response.data.shippingAddress;
        modalRef.componentInstance.discountPercent = response.data.discountPercent;
        modalRef.componentInstance.discountAmount = response.data.discountAmount;
        modalRef.componentInstance.taxAmount = response.data.taxAmount;
        modalRef.componentInstance.adjustmentAmount = response.data.adjustmentAmount;
        modalRef.componentInstance.subTotal = response.data.subTotal;
        modalRef.componentInstance.grandTotal = response.data.grandTotal;
        modalRef.componentInstance.expiredAt = response.data.expiredAt;
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

  SendPaymentEmail(){
    this.router.navigate([`/admin/${this.pageType}/payment/new`], {
      queryParams: { pageType: this.pageType }
    });
  }

  goToPayment() {
    window.open('http://localhost:9007/api/VNPay', '_blank');
  }
}
