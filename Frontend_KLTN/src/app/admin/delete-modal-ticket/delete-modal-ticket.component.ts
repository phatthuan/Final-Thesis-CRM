import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal-ticket',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal-ticket.component.html',
  styleUrl: './delete-modal-ticket.component.scss'
})
export class DeleteModalTicketComponent {

  @Input() title?: string;
  @Input() message?: string;
  @Input() itemId?: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(this.itemId);
  }
}
