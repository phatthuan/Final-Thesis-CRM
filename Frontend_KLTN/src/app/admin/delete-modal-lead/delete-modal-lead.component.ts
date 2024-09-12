import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal-activity',
  templateUrl: './delete-modal-lead.component.html',
  styleUrls: ['./delete-modal-lead.component.scss']
})
export class DeleteModalLeadComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() itemId?: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(this.itemId);
  }
}
