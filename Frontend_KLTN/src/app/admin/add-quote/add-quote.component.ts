import { Component } from '@angular/core';
import { QuotesService } from '../quotes/quotes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrl: './add-quote.component.scss'
})
export class AddQuoteComponent {
  subject:string = "";
  description:string = "";
  billingAddress:string = "";
  shippingAddress: string = "";
  discountPercent:number = 0;
  discountAmount:number = 0;
  taxAmount:number = 0;
  adjustmentAmount:number = 0;
  subTotal:number = 0;
  grandTotal:number = 0;
  pageType:string='';
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private quoteService: QuotesService, private router: Router, private route:ActivatedRoute) {}

  addQuote(){
    const quote = {
      subject: this.subject,
      description: this.description,
      billingAddress:this.billingAddress,
      shippingAddress: this.shippingAddress,
      discountPercent:this.discountPercent,
      discountAmount:this.discountAmount,
      taxAmount:this.taxAmount,
      adjustmentAmount:this.adjustmentAmount,
      subTotal:this.subTotal,
      grandTotal:this.grandTotal,
      
    };
    this.quoteService.addQuote(quote).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: data.status, title: "Quote has been created succesfully." }).then((result) => {
          this.backToPreviousPage();
        });
      },
      error => {
        console.error('Failed to add product:', error);
      }
    );
  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/quotes/`]);
  }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
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
