import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { QuotesService } from '../quotes/quotes.service';

@Component({
  selector: 'app-update-modal-quote',
  templateUrl: './update-modal-quote.component.html',
  styleUrl: './update-modal-quote.component.scss'
})
export class UpdateModalQuoteComponent {
  @Input() quoteId!:string ;
  @Input() subject!:string ;
  @Input() description!:string ;
  @Input() billingAddress!:string ;
  @Input() shippingAddress!: string ;
  @Input() discountPercent!:number ;
  @Input() discountAmount!:number ;
  @Input() taxAmount!:number ;
  @Input() adjustmentAmount!:number ;
  @Input() subTotal!:number ;
  @Input() grandTotal!:number ;
  @Input() pageType!:string;
  @Input() isLoading!:boolean ;
  private destroy$: Subject<void> = new Subject<void>();

  quote: any = {}

  constructor(public activeModal: NgbActiveModal, private quoteService: QuotesService) {}

  updateQuote(){
    this.isLoading = true;
    this.quote = {
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
    }

    this.quoteService.updateQuote(this.quote, this.quoteId).pipe(takeUntil(this.destroy$)).subscribe(
      (response) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: response.status, title: "Quote has been updated successfully" });
        this.activeModal.close('Update');
      },
      (error) => {
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
