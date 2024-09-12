import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

interface ErrorMessage {
  type: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    library: FaIconLibrary
  ) {
    library.addIcons(faEnvelope, faLock)
  }
  @ViewChild('inputField1') inputField1!: ElementRef<HTMLInputElement>;
  @ViewChild('inputField2') inputField2!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDiv1') inputDiv1!: ElementRef<HTMLElement>;
  @ViewChild('inputDiv2') inputDiv2!: ElementRef<HTMLElement>;
  error: ErrorMessage[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  onLoginUser(form: NgForm): void {
    const { email, password } = form.value;
    this.userService.login(email, password).pipe(takeUntil(this.destroy$)).subscribe({
      next: (resdata) => {
        if (resdata.status === 'success') {
          sessionStorage.setItem('token', resdata.data.token);

          this.userService.getUserById(resdata.data.id).pipe(takeUntil(this.destroy$)).subscribe({
            next: (resdata) => {
              if (resdata.status === 'success'){
                this.userService.setUser(resdata.data);
                this.router.navigate(['/home']);
              }
            },
            error: (err)=>{
              
            }
          })
        }
      },
      error: (error) => {
        this.error = [];
        this.error.push({type:"login", message:"Your username or password is not correct. Please try again."});
      },
    });
  }

  ngAfterViewInit() {
    this.inputField1.nativeElement.addEventListener('focus', () =>
      this.addcl(this.inputDiv1.nativeElement)
    );
    this.inputField1.nativeElement.addEventListener('blur', () =>
      this.remcl(this.inputField1.nativeElement, this.inputDiv1.nativeElement)
    );

    this.inputField2.nativeElement.addEventListener('focus', () =>
      this.addcl(this.inputDiv2.nativeElement)
    );
    this.inputField2.nativeElement.addEventListener('blur', () =>
      this.remcl(this.inputField2.nativeElement, this.inputDiv2.nativeElement)
    );

    this.renderer.listen(
      this.inputDiv1.nativeElement.querySelector('.form-label-text'),
      'click',
      () => {
        this.addcl(this.inputDiv1.nativeElement);
        this.inputField1.nativeElement.focus();
      }
    );

    this.renderer.listen(
      this.inputDiv2.nativeElement.querySelector('.form-label-text'),
      'click',
      () => {
        this.addcl(this.inputDiv2.nativeElement);
        this.inputField2.nativeElement.focus();
      }
    );

    this.inputField1.nativeElement.addEventListener('input', () => {
      this.inputDiv1.nativeElement.classList.remove('error');
      this.error = [];
    });

    this.inputField2.nativeElement.addEventListener('input', () => {
      this.inputDiv2.nativeElement.classList.remove('error');
      this.error = [];
    });
  }

  addcl(parent: HTMLElement): void {
    parent.classList.add('focused');
  }

  remcl(input: HTMLInputElement, parent: HTMLElement): void {
    if (input.value === '') {
      parent.classList.remove('focused');
      parent.classList.remove('error');
      this.error = [];
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUser(userId: string){
    this.userService.getUserById(userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (resdata) => {
        if(resdata.status === 'success'){
          this.userService.setUser(resdata.data);
          this.router.navigate([`/home`]);
        }
      },
      error: (error) => {
        this.error = [];
        this.error.push({type:"login", message:"Your username or password is not correct. Please try again."});
      },
    })
  }
}
