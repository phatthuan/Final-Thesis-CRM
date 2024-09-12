import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../products/products.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent {
  @Input() productId: string = ''; 
  @Input() sku: string = "default"; 
  @Input() name: string = ''; 
  @Input() description: string = ''; 
  @Input() quantity: string = ''; 
  @Input() price: string = ''; 
  @Input() imageFile!: File; 
  @Input() imageId!:string;
  product: any = {}; 
  isLoading: boolean = false; 
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public activeModal: NgbActiveModal, private productService: ProductsService) {}
  imageError:Boolean = false;

  ngOnInit(): void {
  }

  onImageChange(event:any){
    this.imageError = false;

    const file = event.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      this.imageError = true;
    } else {
      this.imageFile = file;
    }
  }


  updateProduct(): void {
    this.isLoading = true;
    this.product = {
      sku: this.sku, 
      name: this.name, 
      description: this.description, 
      quantity: this.quantity, 
      price: this.price, 
      imageFile: this.imageFile,  
      imageId: this.imageId
    };

    this.productService.updateProduct(this.product, this.productId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: response.status, title: "Product has been updated successfully" });
        this.activeModal.close('Update');
        
      },
      (error: any) => {
        console.error('Failed to update product:', error);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
