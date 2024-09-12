import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contact/contact.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {
  first_name: string = '';
  last_name: string = '';
  phoneNumber: string = '';
  email: string = '';
  pageType:string='';
  role:string='';
  
  private destroy$: Subject<void> = new Subject<void>();
  constructor( private contactService: ContactsService , private router: Router,private route: ActivatedRoute) {}
  multipartImage!: File;
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
  addContact(){
    const contact = {
      username: "unknown",
      firstName: this.first_name,
      lastName: this.last_name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      role: this.role,
      isActive: true,
      multipartImage: this.multipartImage
    };
    
    this.contactService.addContact(contact).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: data.status, title: "User has been created succesfully." }).then((result) => {
          this.backToPreviousPage();
        });
      },
      error => {
        console.error('Failed to add product:', error);
      }
    );
  }

  backToPreviousPage(){
    this.router.navigate([`/admin/${this.pageType}/contacts/`]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
    });
    
     if(sessionStorage.getItem('admin-token') === null){
      this.router.navigate([`/admin/${this.pageType}/login`]);
    }
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
