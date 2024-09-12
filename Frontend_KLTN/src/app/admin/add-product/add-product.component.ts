import { Component } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificationService } from '../notifications/notifications.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  name: string = '';
  description: string = '';
  pageType:string='';
  sku:string = "default";
  quantity:string = "";
  price:string = "";
  imageFile!:File;

  private destroy$: Subject<void> = new Subject<void>();
  constructor(private productService: ProductsService, private router : Router, private route: ActivatedRoute, private notification:NotificationService) {}
  imageError = false;

  onImageChange(event:any){
    this.imageError = false;

    const file = event.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      this.imageError = true;
    } else {
      this.imageFile = file;
    }
  }

  addProduct(){
    const product = {
      name: this.name,
      description: this.description,
      sku : "default",
      quantity : this.quantity,
      price : this.price,
      imageFile: this.imageFile
    };

    this.productService.addProduct(product).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        const noti = {
          title:"Product is created",
          description:`The Product is created successfully.`,
          userId:null,
          ticketId:null,
          activityId:null,
          quoteId:null,
          productId:data.data.id,
          leadId:null
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

        Toast.fire({ icon: data.status, title: "Product has been created succesfully." }).then((result) => {
          this.backToPreviousPage();
        });
      },
      error => {
        console.error('Failed to add product:', error);
      }
    );
  }

  generateSlug(name:string){
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/products/`]);
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
