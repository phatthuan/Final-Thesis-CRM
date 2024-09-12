import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:9000/api/v1/contacts';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable <any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers: headers});
  }

  deleteCustomer(customerId: string): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.delete(url, {headers: headers});
  }

  addCustomer(contact: any): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl,contact, {headers: headers});
  }

  getCustomerById(customerId: string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.get(url, {headers: headers});
  }

  updateCustomer(customer: any, customerId:string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.put(url, customer, {headers: headers});
  }

  
}
