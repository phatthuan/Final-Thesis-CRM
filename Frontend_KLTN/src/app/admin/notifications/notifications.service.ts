import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:9000/api/v1/notifications';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable <any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers : headers});
  }

  deleteNotification(notificationId: string): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${notificationId}`;
    return this.http.delete(url, {headers : headers});
  }

  addNotification(notification: any): Observable<any> {
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, notification, {headers: headers});
  }

  getNotificationById(notificationId: string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${notificationId}`;
    return this.http.get(url, {headers: headers});
  }

  updateNotification(notification: any, notificationId:string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${notificationId}`;
    return this.http.put(url, notification, {headers: headers});
  }
}
