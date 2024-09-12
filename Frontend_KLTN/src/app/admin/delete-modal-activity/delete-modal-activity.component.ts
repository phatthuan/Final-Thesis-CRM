import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal-activity',
  templateUrl: './delete-modal-activity.component.html',
  styleUrls: ['./delete-modal-activity.component.scss']
})
export class DeleteModalActivityComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() itemId?: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(this.itemId);
  }
}
