import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'http://localhost:9000/api/v1/users';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable <any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers: headers});
  }

  deleteContact(contactId: string): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${contactId}`;
    return this.http.delete(url, {headers: headers});
  }

  addContact(contact: any): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('username', contact.user_name);
    formData.append('email',contact.email);
    formData.append('password', "User@123");
    formData.append('phoneNumber', contact.phoneNumber);
    formData.append('firstName', contact.firstName);
    formData.append('lastName', contact.lastName);
    formData.append('isActive', 'true');
    formData.append('role', "0");
    formData.append('imageFile', contact.multipartImage);

    return this.http.post(this.apiUrl,formData, {headers: headers});
  }

  getContactById(contactId: string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${contactId}`;
    return this.http.get(url, {headers: headers});
  }

  updateContact(contacts: any, contactId:string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('email', contacts.email);
    formData.append('username', contacts.username);
    formData.append('phoneNumber', contacts.phoneNumber);
    formData.append('firstName', contacts.firstName);
    formData.append('lastName', contacts.lastName);
    formData.append('role', contacts.role);
    formData.append('imageId', contacts.imageId);
    formData.append('imageFile', contacts.imageFile);

    const url = `${this.apiUrl}/${contactId}`;
    return this.http.put(url, formData, {headers: headers});
  }
}
