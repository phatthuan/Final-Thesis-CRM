import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:9000/api/v1/products';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable <any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers: headers});
  }

  deleteProduct(productId: string): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url, {headers:headers});
  }

  addProduct(product: any): Observable<any> {
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('sku', product.sku);
    formData.append('quantity', product.quantity);
    formData.append('price', product.price);
    formData.append('imageFile', product.imageFile);

    return this.http.post(this.apiUrl, formData, {headers:headers});
  }

  getProductById(productId: string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get(url, {headers:headers});
  }

  updateProduct(product: any, productId:string): Observable<any>{
    const token = sessionStorage.getItem('admin-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('sku', product.sku);
    formData.append('quantity', product.quantity);
    formData.append('price', product.price);
    formData.append('imageFile', product.imageFile);
    formData.append('imageId', product.imageId);

    const url = `${this.apiUrl}/${productId}`;
    return this.http.put(url, formData, {headers: headers});
  }
}
