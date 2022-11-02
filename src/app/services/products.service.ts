import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getProducts(): Observable<{products: Array<Product>}> {
    return this.http.get<{products: Array<Product>}>(environment.apiUrl + 'products')
  }

  getCalculatedProduct(params: any): Observable<{product: Product}> {
    return this.http.get<{product: Product}>(environment.apiUrl + 'products/calculator', {params: params})
  }

  createProduct(productData: {product: Product}): Observable<{product: Product}> {
    return this.http.post<{product: Product}>(environment.apiUrl + 'products', productData, this.httpOptions)
  }

  updateProduct(productId: string, productData: {product: Product}): Observable<{product: Product}> {
    return this.http.put<{product: Product}>(environment.apiUrl + 'products/' + productId, productData, this.httpOptions)
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + 'products/' + productId, this.httpOptions)
  }
}
