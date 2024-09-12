import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AcitivityService } from '../activities/activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-yt-video',
  templateUrl: './post-yt-video.component.html',
  styleUrl: './post-yt-video.component.scss'
})
export class PostYtVideoComponent {
  title:string = "";
  description:string = "";
  video!: File;
  private destroy$: Subject<void> = new Subject<void>();
  imageError = false;

  constructor( private activityService: AcitivityService , private router: Router,private route: ActivatedRoute, public activeModal: NgbActiveModal) {
  }

  onVideoChange(event: any) {
    const videoFile = event.target.files[0];
    if (videoFile) {
      this.video = videoFile;
    }else{
      this.imageError = true;
    }
  }

  postVideo(){
    this.activityService.postYoutubeVideo(this.title,this.description, this.video).pipe(takeUntil(this.destroy$)).subscribe(
      (res)=>{
        if(res.status === 'success'){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
  
          Toast.fire({ icon: "success", title: "The video has been uploaded successfully" });
          this.activeModal.close("Add");
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
