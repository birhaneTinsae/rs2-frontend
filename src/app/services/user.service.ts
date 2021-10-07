import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(pageIndex: number = 0,
    pageSize: number = 20,
    sortField: string = 'createdAt',
    sortOrder: string = 'DESC',
    filters: Array<{ key: string; value: string[] }>): Observable<UserResponse> {
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`)
      .append('sort', `id,ASC`)

    return this.http.get<UserResponse>(`${environment.HOST}/users`, { params })
      .pipe(catchError(this.errorHandler))
  }

  getUserById(userId: number) {
    return this.http.get<User>(`${environment.HOST}/users/${userId}`)
      .pipe(catchError(this.errorHandler))

  }

  createUser(userDetail: User) {
    return this.http.post(`${environment.HOST}/users`, { ...userDetail })
      .pipe(catchError(this.errorHandler))
  }

  updateUser(userDetail: User, userId: number) {
    return this.http.put(`${environment.HOST}/users/${userId}`, { ...userDetail })
      .pipe(catchError(this.errorHandler))
  }

  deleteUser(userId: string) {
    return this.http.delete(`${environment.HOST}/users/${userId}`)
      .pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}