import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username!: string;
  password!: string;
  pageType!: string;
  private destroy$: Subject<void> = new Subject<void>();

  loginFailed: boolean = false;
  errorMessage: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2,private router: Router, private route: ActivatedRoute, private userService:UserService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setFullHeight();
  }

  ngOnInit() {
    this.pageType = this.route.snapshot.data['pageType'] || '';
    if(sessionStorage.getItem('admin-token')===null){
      this.setFullHeight();
      this.router.navigate([`/admin/${this.pageType}/login`]);
    }
    else{
      this.router.navigate([`/admin/${this.pageType}/dashboard`]);
    }
  }

  setFullHeight() {
    let windowHeight = window.innerHeight;
    let elements = this.el.nativeElement.querySelectorAll('.js-fullheight');
    elements.forEach((element: HTMLElement) => {
      this.renderer.setStyle(element, 'height', `${windowHeight}px`);
    });
  }

  togglePassword() {
    let inputEl = this.el.nativeElement.querySelector('input[type="password"], input[type="text"]');
    if (inputEl.type === 'password') {
      this.renderer.setAttribute(inputEl, 'type', 'text');
    } else {
      this.renderer.setAttribute(inputEl, 'type', 'password');
    }
  }

  onSubmit() {
    this.userService.login(this.username, this.password).pipe(takeUntil(this.destroy$)).subscribe(
      (response)=>{
        if(response.status === 'success' && (response.data.role === 1 || response.data.role === 2)){
          this.loginFailed = false;
          sessionStorage.setItem('admin-token', response.data.token);
          this.router.navigate([`/admin/${this.pageType}/dashboard`]);
        } else {
          this.loginFailed = true;
          this.errorMessage = 'Incorrect username or password';
        }
      },
      (error)=>{
        console.log(error);
        this.loginFailed = true;
        this.errorMessage = 'Incorrect username or password';
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
