import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private apiUrl = 'http://localhost:9000/api/v1/quotes';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable <any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers: headers});
  }

  deleteQuote(quoteId: string): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${quoteId}`;
    return this.http.delete(url, {headers:headers});
  }

  addQuote(quote: any): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('name', quote.name);
    formData.append('description', quote.description);
    formData.append('sku', quote.sku);
    formData.append('quantity', quote.quantity);
    formData.append('price', quote.price);
    formData.append('imageFile', quote.imageFile);

    return this.http.post(this.apiUrl, formData, {headers:headers});
  }

  getQuoteById(quoteId: string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${quoteId}`;
    return this.http.get(url, {headers:headers});
  }

  updateQuote(quote: any, quoteId:string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${quoteId}`;
    return this.http.put(url, quote, {headers: headers});
  }
}
