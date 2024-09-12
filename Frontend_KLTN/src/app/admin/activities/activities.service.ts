import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcitivityService {
  private apiUrl = 'http://localhost:9000/api/v1/activities'; 

  constructor(private http: HttpClient) {}

  getAllItems(): Observable <any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(token);
    return this.http.get<any>(this.apiUrl, {headers : headers});
  }

  deleteActivity(activityId: string): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${activityId}`;
    return this.http.delete(url, {headers : headers});
  }

  addActivity(activity: any): Observable<any> {
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, activity, {headers: headers});
  }

  getActivityById(activityId: string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${activityId}`;
    return this.http.get(url, {headers: headers});
  }

  updateActivity(activity: any, activityId:string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${activityId}`;
    return this.http.put(url, activity, {headers: headers});
  }

  sendToEmail(emailRequest:any): Observable<any>{
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl+"/send-email", emailRequest, {headers: headers});
  }

  createFacebookPost(caption:string, imageFile: File): Observable<any>{
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('imageFile', imageFile);

    return this.http.post<any>(this.apiUrl+"/facebook/create-post",formData, {headers: headers});
  }

  postYoutubeVideo(title:string,description:string, video: File): Observable<any>{
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', video);

    return this.http.post<any>(this.apiUrl+"/youtube/create-video",formData, {headers: headers});
  }

  addEvent(event: any): Observable<any> {
    console.log(event);
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('summary', event.summary);
    formData.append('description', event.description);
    formData.append('dateScheduleFrom', event.dateScheduleFrom);
    formData.append('dateScheduleTo', event.dateScheduleTo);
    formData.append('location', event.location);
    formData.append('attendee', event.attendee);

    const url = this.apiUrl + "/google-calendar/create-event"

    return this.http.post<any>(url, formData, {headers: headers});
  }
}
