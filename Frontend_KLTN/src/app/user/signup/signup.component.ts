import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBook, faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { PersonService } from 'src/app/admin/leads/persons.service';

interface ErrorMessage {
  type: string;
  message: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('inputField1') inputField1!: ElementRef<HTMLInputElement>;
  @ViewChild('inputField2') inputField2!: ElementRef<HTMLInputElement>;
  @ViewChild('inputField3') inputField3!: ElementRef<HTMLInputElement>;
  @ViewChild('inputField4') inputField4!: ElementRef<HTMLInputElement>;
  @ViewChild('inputField5') inputField5!: ElementRef<HTMLInputElement>;
  @ViewChild('inputField6') inputField6!: ElementRef<HTMLInputElement>;
  @ViewChild('inputField7') inputField7!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDiv1') inputDiv1!: ElementRef<HTMLElement>;
  @ViewChild('inputDiv2') inputDiv2!: ElementRef<HTMLElement>;
  @ViewChild('inputDiv3') inputDiv3!: ElementRef<HTMLElement>;
  @ViewChild('inputDiv4') inputDiv4!: ElementRef<HTMLElement>;
  @ViewChild('inputDiv5') inputDiv5!: ElementRef<HTMLElement>;
  @ViewChild('inputDiv6') inputDiv6!: ElementRef<HTMLElement>;
  @ViewChild('inputDiv7') inputDiv7!: ElementRef<HTMLElement>;
  multipartImage!: File;
  imageError = false;
  private destroy$: Subject<void> = new Subject<void>();


  error: ErrorMessage[] = [];

  constructor(private router: Router, private useService: UserService, library: FaIconLibrary, private renderer: Renderer2, private http: HttpClient, private personService : PersonService) {
    library.addIcons(faUser,faBook, faEnvelope, faLock, faPhone);
  }

  onCreateUser(form: NgForm) {
    const { user_name, email, password, phone, first_name, last_name, confirm_password } = form.value;
    
    this.error = [];

    if(!this.validateName(first_name)){
      this.error.push({type:"firstname", message:"Your name must not contain the number"});
      this.inputDiv1.nativeElement.classList.add("error");
      this.inputField1.nativeElement.value = "";
      this.inputField1.nativeElement.focus();
      return;
    }else if(!this.validateName(last_name)){
      this.error.push({type:"lastname", message:"Your name is not contained the number"});
      this.inputDiv2.nativeElement.classList.add("error");
      this.inputField2.nativeElement.value = "";
      this.inputField2.nativeElement.focus();
      return;
    }else if(!this.validateEmail(email)){
      this.error.push({type:"email", message:"Your email is invalid"});
      this.inputDiv4.nativeElement.classList.add("error");
      this.inputField4.nativeElement.value = "";
      this.inputField4.nativeElement.focus();
      return;
    }else if(!this.validatePassword(password)){
      this.error.push({type:"password", message:"Your password must have minimum 8 characters, at least 1 uppercase, 1 lowercase and 1 symbol"});
      this.inputDiv5.nativeElement.classList.add("error");
      this.inputField5.nativeElement.value = "";
      this.inputField5.nativeElement.focus();
      return;
    }else if(!this.validateConfirmPassword(password, confirm_password)){
      this.error.push({type:"confirm_password", message:"Your password does not match"});
      this.inputDiv6.nativeElement.classList.add("error");
      this.inputField6.nativeElement.value = "";
      this.inputField6.nativeElement.focus();
      return;
    }else if(!this.validatePhone(phone)){
      this.error.push({type:"phone", message:"Your phone's number must have 10 characters"});
      this.inputDiv7.nativeElement.classList.add("error");
      this.inputField7.nativeElement.value = "";
      this.inputField7.nativeElement.focus();
      return;
    }
    

    this.useService.register(user_name, email, password, phone, first_name, last_name, this.multipartImage).pipe(takeUntil(this.destroy$)).subscribe(
      (resdata) => {
        if (resdata.status === "success") {
          const person = {
            name: first_name + " " +last_name,
            emails: email,
            contactNumbers: phone
          };
          this.personService.addPerson(person).pipe(takeUntil(this.destroy$)).subscribe(
            (res) =>{
              console.log("Success");
            },
            (err)=>{
              console.error("Error");
            }
          )
          this.router.navigate(['/home/login']);
        } else {
          this.error = [];
          this.error.push({type:"email", message:resdata.message});
        }
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.inputField1.nativeElement.addEventListener('focus', () => this.addcl(this.inputDiv1.nativeElement));
    this.inputField1.nativeElement.addEventListener('blur', () => this.remcl(this.inputField1.nativeElement, this.inputDiv1.nativeElement));
    
    this.inputField2.nativeElement.addEventListener('focus', () => this.addcl(this.inputDiv2.nativeElement));
    this.inputField2.nativeElement.addEventListener('blur', () => this.remcl(this.inputField2.nativeElement, this.inputDiv2.nativeElement));

    this.inputField3.nativeElement.addEventListener('focus', () => this.addcl(this.inputDiv3.nativeElement));
    this.inputField3.nativeElement.addEventListener('blur', () => this.remcl(this.inputField3.nativeElement, this.inputDiv3.nativeElement));
    
    this.inputField4.nativeElement.addEventListener('focus', () => this.addcl(this.inputDiv4.nativeElement));
    this.inputField4.nativeElement.addEventListener('blur', () => this.remcl(this.inputField4.nativeElement, this.inputDiv4.nativeElement));

    this.inputField5.nativeElement.addEventListener('focus', () => this.addcl(this.inputDiv5.nativeElement));
    this.inputField5.nativeElement.addEventListener('blur', () => this.remcl(this.inputField5.nativeElement, this.inputDiv5.nativeElement));
    
    this.inputField6.nativeElement.addEventListener('focus', () => this.addcl(this.inputDiv6.nativeElement));
    this.inputField6.nativeElement.addEventListener('blur', () => this.remcl(this.inputField6.nativeElement, this.inputDiv6.nativeElement));

    this.inputField7.nativeElement.addEventListener('focus', () => this.addcl(this.inputDiv7.nativeElement));
    this.inputField7.nativeElement.addEventListener('blur', () => this.remcl(this.inputField7.nativeElement, this.inputDiv7.nativeElement));
  
    this.renderer.listen(this.inputDiv1.nativeElement.querySelector('.form-label-text'), 'click', () => {
      this.addcl(this.inputDiv1.nativeElement);
      this.inputField1.nativeElement.focus();
    });

    this.renderer.listen(this.inputDiv2.nativeElement.querySelector('.form-label-text'), 'click', () => {
      this.addcl(this.inputDiv2.nativeElement);
      this.inputField2.nativeElement.focus();
    });

    this.renderer.listen(this.inputDiv3.nativeElement.querySelector('.form-label-text'), 'click', () => {
      this.addcl(this.inputDiv3.nativeElement);
      this.inputField3.nativeElement.focus();
    });

    this.renderer.listen(this.inputDiv4.nativeElement.querySelector('.form-label-text'), 'click', () => {
      this.addcl(this.inputDiv4.nativeElement);
      this.inputField4.nativeElement.focus();
    });

    this.renderer.listen(this.inputDiv5.nativeElement.querySelector('.form-label-text'), 'click', () => {
      this.addcl(this.inputDiv5.nativeElement);
      this.inputField5.nativeElement.focus();
    });

    this.renderer.listen(this.inputDiv6.nativeElement.querySelector('.form-label-text'), 'click', () => {
      this.addcl(this.inputDiv6.nativeElement);
      this.inputField6.nativeElement.focus();
    });

    this.renderer.listen(this.inputDiv7.nativeElement.querySelector('.form-label-text'), 'click', () => {
      this.addcl(this.inputDiv7.nativeElement);
      this.inputField7.nativeElement.focus();
    });

    this.inputField1.nativeElement.addEventListener('input', () => {
      this.inputDiv1.nativeElement.classList.remove("error");
      this.error = [];
    });

    this.inputField2.nativeElement.addEventListener('input', () => {
      this.inputDiv2.nativeElement.classList.remove("error");
      this.error = [];
    });

    this.inputField3.nativeElement.addEventListener('input', () => {
      this.inputDiv3.nativeElement.classList.remove("error");
      this.error = [];
    });

    this.inputField4.nativeElement.addEventListener('input', () => {
      this.inputDiv4.nativeElement.classList.remove("error");
      this.error = [];
    });

    this.inputField5.nativeElement.addEventListener('input', () => {
      this.inputDiv5.nativeElement.classList.remove("error");
      this.error = [];
    });

    this.inputField6.nativeElement.addEventListener('input', () => {
      this.inputDiv6.nativeElement.classList.remove("error");
      this.error = [];
    });

    this.inputField7.nativeElement.addEventListener('input', () => {
      this.inputDiv7.nativeElement.classList.remove("error");
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

  validateName(name:string):boolean{
    const containsNumberRegex = /^[^\d]*$/;
    
    return containsNumberRegex.test(name) && name.trim()!=="";
  }

  validateEmail(email:string):boolean{
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailFormat.test(email) && email.trim()!=="";
  }

  validatePassword(password:string):boolean{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)  && password.trim()!=="";
  }

  validateConfirmPassword(password:string, confirmPassword:string):boolean{
    return password === confirmPassword  && confirmPassword.trim()!=="";
  }

  validatePhone(phone:string):boolean{
    const onlyNumbersRegex = /^[0-9]+$/;
    return phone.length === 10 && phone.trim()!=="" && onlyNumbersRegex.test(phone);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
