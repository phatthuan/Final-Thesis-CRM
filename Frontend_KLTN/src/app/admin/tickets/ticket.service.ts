import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:9000/api/v1/tickets'; 

  constructor(private http: HttpClient) {}

  getAllItems(): Observable <any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers : headers});
  }

  deleteTicket(ticketId: string): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${ticketId}`;
    return this.http.delete(url, {headers : headers});
  }

  addTicket(ticket: any): Observable<any> {
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, ticket, {headers: headers});
  }

  getTicketById(ticketId: string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${ticketId}`;
    return this.http.get(url, {headers: headers});
  }

  updateTicket(ticket: any, ticketId:string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${ticketId}`;
    return this.http.put(url, ticket, {headers: headers});
  }
}
