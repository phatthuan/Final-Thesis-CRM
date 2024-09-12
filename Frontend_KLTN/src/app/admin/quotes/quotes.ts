export interface Quotes {
  subject:string ;
  description:string ;
  billingAddress:string ;
  shippingAddress: string ;
  discountPercent:number ;
  discountAmount:number ;
  taxAmount:number ;
  adjustmentAmount:number ;
  subTotal:number ;
  grandTotal:number ;
  pageType:string;
  createdAt:string;
}