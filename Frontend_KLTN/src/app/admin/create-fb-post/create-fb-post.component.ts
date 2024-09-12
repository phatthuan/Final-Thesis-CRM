import { Component } from '@angular/core';
import { AcitivityService } from '../activities/activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-fb-post',
  templateUrl: './create-fb-post.component.html',
  styleUrl: './create-fb-post.component.scss'
})
export class CreateFbPostComponent {
  caption:string = "";
  multipartImage!: File;
  private destroy$: Subject<void> = new Subject<void>();
  imageError = false;
  pageType!:string;

  constructor( private activityService: AcitivityService , private router: Router,private route: ActivatedRoute, public activeModal: NgbActiveModal, library: FaIconLibrary) {
    library.addIcons(faSyncAlt);
  }

  ngOnInit() {
    this.pageType = this.route.snapshot.data['pageType'] || '';
    
     if(sessionStorage.getItem('admin-token') === null){
      this.router.navigate([`/admin/${this.pageType}/login`]);
    }
  }

  onImageChange(event:any){
    this.imageError = false;

    const file = event.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      this.imageError = true;
    } else {
      this.multipartImage = file;
    }
  }

  createPost(){
    this.activityService.createFacebookPost(this.caption, this.multipartImage).pipe(takeUntil(this.destroy$)).subscribe(
      (res)=>{
        if(res.status === 'success'){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
  
          Toast.fire({ icon: "success", title: "The post has been created successfully" }).then(()=>{
            this.activeModal.close("Add");
          });
        }
      }
    )
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeModal(){
    this.activeModal.close("Add");
  }
}
