import { Injectable, Inject } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AuthenticationService } from "../_service/authentication.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    @Inject("BASE_URL") private baseUrl: string,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(this.baseUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err, caught) => {
        if (err.status === 401) {
          debugger;
          this.handleAuthError();
          return of(err);
        }
        throw err;
      })
    );
  }
  private handleAuthError() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
