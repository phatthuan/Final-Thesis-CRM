import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  constructor(library: FaIconLibrary, private router:Router) {
    library.addIcons(faQuoteLeft);
  }
  currentImageLink:string = '../../../assets/customer-1.jpg';

  changeImageA(){
    this.currentImageLink = '../../../assets/customer-1.jpg';
  }

  changeImageB(){
    this.currentImageLink = '../../../assets/customer-2.jpg';
  }

  changeImageC(){
    this.currentImageLink = '../../../assets/customer.jpg';
  }

  redirect(url:string){
    this.router.navigate([url]);
  }

  slides = [
    {img: "../../../assets/customer.jpg"},
    {img: "../../../assets/customer-2.jpg"},
    {img: "../../../assets/customer.jpg"},
    {img: "../../../assets/customer-2.jpg"}
  ];
  
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e:any) {
    console.log('slick initialized');
  }
  
  breakpoint(e:any) {
    console.log('breakpoint');
  }
  
  afterChange(e:any) {
    console.log('afterChange');
  }
  
  beforeChange(e:any) {
    console.log('beforeChange');
  }
}
