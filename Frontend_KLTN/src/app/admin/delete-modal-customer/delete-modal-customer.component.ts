import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal-customer',
  templateUrl: './delete-modal-customer.component.html',
  styleUrl: './delete-modal-customer.component.scss'
})
export class DeleteModalCustomerComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() itemId?: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(this.itemId);
  }
}
