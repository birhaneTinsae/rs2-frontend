import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {


  constructor(
    private router: Router,
    private notificationService: NzNotificationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler,
  ) {

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')} `
      }
    })

    return next.handle(req).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.router.navigate(['/auth']);
              break;
            case 404:
              break;
            case 403:
              break;
            case 408:
              this.notificationService.error('Error', 'Request Timeout');
              break;
            case 500:
              this.notificationService.error('Error', 'Network Error Address unreachable');
             
              // this.router.navigate(['/error/500']);
              break;
            default:
              // this.router.navigate(['/error'])
              this.notificationService.error('Error', 'Network Error Address unreachable');
              break;
          }

        }
      }));
  }
}