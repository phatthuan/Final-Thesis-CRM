import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceCatalogComponent } from './service-catalog.component';

@NgModule({
  declarations: [
    ServiceCatalogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})
export class ServiceCatalogModule { }
