import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal-contact',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal-contact.component.html',
  styleUrl: './delete-modal-contact.component.scss'
})
export class DeleteModalContactComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() itemId?: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(this.itemId);
  }
}
