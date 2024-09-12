import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../contact/contact.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-modal-contact',
  templateUrl: './update-modal-contact.component.html',
  styleUrl: './update-modal-contact.component.scss'
})
export class UpdateModalContactComponent {
  @Input()contactId!: string; 
  @Input()firstName!: string;
  @Input()lastName!: string;
  @Input()phoneNumber!: string;
  @Input()email!: string;
  @Input()role!: string;
  @Input()isLoading: boolean = false;
  @Input()imageId!: string;
  
  @Input()multipartImage!: File;
  imageError = false;

  onImageChange(event:any){
    this.imageError = false;

    const file = event.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      this.imageError = true;
    } else {
      this.multipartImage = file;
    }
  }

  contacts: any = {};
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public activeModal: NgbActiveModal, private contactService: ContactsService) {}

  updateContact(): void {
    this.contacts = {
      username: "unknown",
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      role: this.role,
      imageFile: this.multipartImage,
      imageId: this.imageId
    }

    this.isLoading = true;
    this.contactService.updateContact(this.contacts, this.contactId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: response.status, title: "Contact has been updated successfully" });
        this.activeModal.close('Update');
      },
      (error: any) => {
        console.error('Failed to update user:', error);
        this.isLoading = false;
      }
    );
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
