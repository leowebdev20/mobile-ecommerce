import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export const SkipInterceptor = 'X-Skip-Interceptor';
export const WriteObject = 'X-Write-object';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.has(SkipInterceptor)) {
      const headers = request.headers.delete(SkipInterceptor);
      return next.handle(request.clone({headers}));
    }

    if (request.headers.has(WriteObject)) {
      const headers = request.headers.delete(WriteObject);
      const updateRequest = request.clone({
        setParams: {
          consumer_key: environment.writableKeys.consumer_key,
          consumer_secret: environment.writableKeys.consumer_secret
        },
        headers
      });
      return next.handle(updateRequest);
    }

    const modifiedRequest = request.clone({
      setParams: {
        consumer_key: environment.readOnlyKeys.consumer_key,
        consumer_secret: environment.readOnlyKeys.consumer_secret
      }
    });
    return next.handle(modifiedRequest); 
  }
}
