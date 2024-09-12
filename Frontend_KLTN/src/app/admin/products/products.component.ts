import { Component } from '@angular/core';
import { ItemService } from 'src/app/user/service-catalog/item-service.service';
import { ProductsService } from './products.service';
import { Item } from './Item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ImageFile } from 'src/app/user/imageFile';
import { Config } from 'datatables.net';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  items: Item[] = [];
  pageType!:string;
  loading = true;
  private destroy$: Subject<void> = new Subject<void>();

  filteredItems: any = [];
  searchTerm: string = '';

  sortColumn: string = '';
  sortDirection: boolean = true;
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductsService, private modalService: NgbModal, private router: Router,private route: ActivatedRoute) {}
  
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
    this.getProducts();
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

  openDeleteConfirmation(itemId: string) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message = 'Are you sure you want to delete this item?';
    modalRef.componentInstance.itemId = itemId;

    modalRef.result.then((itemIdToDelete) => {
      if (itemIdToDelete) {
        this.productService.deleteProduct(itemIdToDelete).pipe(takeUntil(this.destroy$)).subscribe(response => {
          this.refreshItemList();
        }, error => {
          console.error('Failed to delete item:', error);
        });
      }
    }).catch((error) => {
      console.log('Modal dismissed:', error);
    });
  }

  AddProduct() {
    this.router.navigate([`/admin/${this.pageType}/products/new`], {
      queryParams: { pageType: this.pageType }
    });
  }

  refreshItemList() {
    window.location.reload();
  }

  getImagePath(imageFile: ImageFile | undefined): string {
    return imageFile && imageFile.data ? `data:image/png;base64,${imageFile!.data}` : '';
  }

  getProducts(){
    this.productService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        console.log(res);
        if(res.status === "success"){
          this.filteredItems = res.data;
          this.loading = false;
          this.items = res.data.map((product: any) => {
            product.date = new Date(product.date);
            return product;
          });
          this.items.sort((a: any, b: any) => {
            return b.date.getTime() - a.date.getTime();
          });
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

        Toast.fire({ icon: "error", title: "Product has been loaded unsuccessfully." });
      }
    );
  }

  openUpdateModal(productId: string): void {

    this.productService.getProductById(productId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        console.log(response);
        const modalRef = this.modalService.open(UpdateModalComponent, {
          centered: true,
        });

        modalRef.componentInstance.productId = productId;
        modalRef.componentInstance.sku = response.data.sku;
        modalRef.componentInstance.name = response.data.name;
        modalRef.componentInstance.description = response.data.description;
        modalRef.componentInstance.price = response.data.price;
        modalRef.componentInstance.quantity = response.data.quantity;
        modalRef.componentInstance.imageId = response.data.imageId;
        modalRef.componentInstance.imageFile = response.data.imageFile
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
}
