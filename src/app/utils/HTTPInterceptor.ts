import { Router } from '@angular/router';
import { AccessService } from './../services/AccessService';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.toString().includes('/oauth/token') && !req.url.toString().includes('/unsecured')) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.getToken()}`
                }
            });
        }
        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.router.navigate(['/login']);
            }
        });
    }
    getToken() {
        return localStorage.getItem('access_token');
    }
}
