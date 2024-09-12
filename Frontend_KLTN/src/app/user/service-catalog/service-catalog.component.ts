import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Item } from './Item';
import { ItemService } from './item-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTicketModalComponent } from '../add-ticket-modal/add-ticket-modal.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-service-catalog',
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.scss']
})
export class ServiceCatalogComponent implements OnInit {
  items: Item[] = [];
  constructor(private itemService: ItemService) {}
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.itemService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if(data.status === "success"){
          
          this.items = data.data;
        }
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
