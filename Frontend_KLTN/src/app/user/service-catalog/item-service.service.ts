import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './Item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:9000/api/v1/products'; 

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}