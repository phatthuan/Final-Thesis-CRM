import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private apiUrl = 'http://localhost:9000/api/v1/leads'; 

  constructor(private http: HttpClient) {}

  getAllItems(): Observable <any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(token);
    return this.http.get<any>(this.apiUrl, {headers : headers});
  }

  deleteLead(leadId: string): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${leadId}`;
    return this.http.delete(url, {headers : headers});
  }

  addLead(lead: any): Observable<any> {
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, lead, {headers: headers});
  }

  getLeadById(leadId: string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${leadId}`;
    return this.http.get(url, {headers: headers});
  }

  updateLead(lead: any, leadId:string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${leadId}`;
    return this.http.put(url, lead, {headers: headers});
  }
  
  convertListToContact(customer:any): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/convert-lead-to-contact`;
    return this.http.post(url,customer,{headers: headers});
  }
}
