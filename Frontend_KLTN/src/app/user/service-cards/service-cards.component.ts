import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTicketModalComponent } from '../add-ticket-modal/add-ticket-modal.component';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.scss']
})
export class ServiceCardsComponent {
  constructor( private modalService: NgbModal){

  }
  openAddTicketModal() {
    this.modalService.open(AddTicketModalComponent);
  }
}
