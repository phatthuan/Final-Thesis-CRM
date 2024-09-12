import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal-activity',
  templateUrl: './delete-modal-quote.component.html',
  styleUrls: ['./delete-modal-quote.component.scss']
})
export class DeleteModalQuoteComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() itemId?: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(this.itemId);
  }
}
