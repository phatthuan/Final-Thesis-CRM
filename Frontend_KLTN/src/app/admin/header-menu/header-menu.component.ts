import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/user/service/user.service';
import { NotificationService } from '../notifications/notifications.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  @Input() pageType: string = '';
  @ViewChild('loadMoreButton', { static: false }) loadMoreButton!: ElementRef;

  private destroy$: Subject<void> = new Subject<void>();

  showFiller = false;

  constructor(public dialog: MatDialog, private userService:UserService, private eRef: ElementRef, private notificationService:NotificationService) {}

  onInit() {
    console.log(this.pageType);
  }

  isDropdownVisible = false;
  notifications = [
    // { message: 'You have a new message', time: '2 minutes ago' },
    // { message: 'Your order has been shipped', time: '1 hour ago' },
    // { message: 'New comment on your post', time: '3 hours ago' },
    // { message: 'Password change successful', time: '5 hours ago' },
    // { message: 'Your subscription is about to expire', time: '8 hours ago' },
    // { message: 'New friend request', time: '1 day ago' }
  ];
  displayedNotifications:any = [];
  displayCount = 4;
  hasMoreNotifications = false;

  ngOnInit() {
    this.getNotifications();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  loadMore() {
    const nextBatch = this.notifications.slice(
      this.displayedNotifications.length,
      this.displayedNotifications.length + this.displayCount
    );
    this.displayedNotifications = [...this.displayedNotifications, ...nextBatch];
    this.hasMoreNotifications = this.displayedNotifications.length < this.notifications.length;
  }

  trackByFn(index: number, item: any) {
    return index; 
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      !this.eRef.nativeElement.contains(event.target) &&
      (!this.loadMoreButton || !this.loadMoreButton.nativeElement.contains(event.target))
    ) {
      this.isDropdownVisible = false;
    }
  }

  logout(): void {
    this.userService.clearUser();
    sessionStorage.removeItem('admin-token');
    // this.router.navigate(['/']);
  }

  getNotifications():void{
    this.notificationService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        if(res.status === "success"){
          console.log(res.data);
          this.notifications = res.data;
          this.displayedNotifications = this.notifications.slice(0, this.displayCount);
          this.hasMoreNotifications = this.notifications.length > this.displayCount;
        }
      },
      (error) => {
        console.log(error);
        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: "error", title: "Notifcation has been loaded unsuccessfully." });
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTimeDifference(dateString: string): string {
    const givenDate = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - givenDate.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute(s) ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour(s) ago`;
    } else {
      return `${diffInDays} day(s) ago`;
    }
  }
}
