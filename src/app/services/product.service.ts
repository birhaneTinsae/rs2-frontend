import { HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product, ProductResponse } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }
  getProducts(pageIndex: number = 0,
    pageSize: number = 20,
    sortField: string = 'id',
    sortOrder: string = 'ASC',
    filters: Array<{ key: string; value: string[] }>): Observable<ProductResponse> {

    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`)
      .append('sort', `${sortField},${sortOrder}`)



    return this.http.get<ProductResponse>(`${environment.HOST}/products`, { params })
      .pipe(catchError(this.errorHandler))
  }
  search(pageIndex: number = 0,
    pageSize: number = 20,
    sortField: string = 'id',
    sortOrder: string = 'ASC',
    name: string,
    type: string): Observable<ProductResponse> {

    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`)
      .append('sort', `${sortField},${sortOrder}`)
      .append('name', name)
      .append('type', type)


    return this.http.get<ProductResponse>(`${environment.HOST}/products/search`, { params })
      .pipe(catchError(this.errorHandler))
  }

  getProductById(productId: number) {
    return this.http.get<Product>(`${environment.HOST}/products/${productId}`)
      .pipe(catchError(this.errorHandler))

  }

  createProduct(product: Product) {
    return this.http.post(`${environment.HOST}/products`, { ...product })
      .pipe(catchError(this.errorHandler))
  }

  updateProduct(productId: number, product: Product) {

    return this.http.put(`${environment.HOST}/products/${productId}`, { ...product })
      .pipe(catchError(this.errorHandler))
  }


  buyProducts(products: Product[]) {
    const p = products.map(product => {
      return {
        product
      }
    })
    console.log(p);
    return this.http.post(`${environment.HOST}/baskets/multiple`, p)
      .pipe(catchError(this.errorHandler))
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${environment.HOST}/products/${productId}`)
      .pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
