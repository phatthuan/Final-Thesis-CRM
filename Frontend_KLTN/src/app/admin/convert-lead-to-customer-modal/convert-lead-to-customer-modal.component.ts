import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-convert-lead-to-customer-modal',
  templateUrl: './convert-lead-to-customer-modal.component.html',
  styleUrl: './convert-lead-to-customer-modal.component.scss'
})
export class ConvertLeadToCustomerModalComponent {

  @Input() title?: string;
  @Input() message?: string;
  @Input() itemId?: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(this.itemId);
  }
}
