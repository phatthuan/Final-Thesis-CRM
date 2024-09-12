import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:9000/api/v1/users';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  constructor(private http: HttpClient, private router: Router){
    const storedUser = localStorage.getItem('currentUser');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();

  }  
  public get currentUserValue(): User | null{
    return this.currentUserSubject.value;
  }

  public setUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public clearUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.url}/login`, body, {headers});
  } 

  register(user_name:string,email: string, password: string, phone:string, first_name:string, last_name:string, multipartImage:File):Observable<any>{
    const formData = new FormData();
    formData.append('username', user_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phone);
    formData.append('firstName', first_name);
    formData.append('lastName', last_name);
    formData.append('isActive', 'true');
    formData.append('role', '0');
    formData.append('imageFile', multipartImage);

    return this.http.post(`${this.url}`, formData);
  }

  getUserId(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.id : null;
  }

  getUserName(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.firstName +" "+ currentUser.lastName : null;
  }

  getUserById(userId:string): Observable<any> {
    const url = `${this.url}/${userId}`;
    return this.http.get<any>(url);
  }

  getMessage(){
    const msgUrl = "http://localhost:9000/api/v1/notifications/messages";
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(msgUrl, {headers : headers});
  }
  
}
