import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private apiUrl = 'https://localhost:44310/api/products';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product, this.httpOptions);
  }

  updateProduct(product: Product): Observable<any> {
    const url = `${this.apiUrl}/${product.Id}`;
    return this.httpClient.put<Product>(url, product, this.httpOptions);
  }

  deleteProduct(id:number): Observable<Product>{
    return this.httpClient.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
