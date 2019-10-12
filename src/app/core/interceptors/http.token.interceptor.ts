import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services/jwt.service';
import { UserService } from '../services';

@Injectable()

// in HttpClient -> advanced in angular.io

export class HttpTokenInterceptor implements HttpInterceptor {
  // inject jwtService
  constructor(
    private jwtService: JwtService,
    private _userService: UserService
    ) {}

  /*
    The intercept() method could inspect that observable and alter it
    before returning it to the caller.
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headersConfig;
    /*
    - If req.body = formData => headersConfig has only Accept
    else re.body = JSON object => need 'Content-Type': 'application/json'
    ==> b/c httpInterceptor is executed when we call HTTP Request
     */

    if (this._userService.isFormData) {
      headersConfig = {
        Accept: 'application/json'
      };
    } else {
      headersConfig = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };
    }

    /*
    - check if the current user is logged in
    - If the user making the request is logged in,
      he will have JWT token in it's local storage
    */
    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    /*
      If have, add the additional [Authorization] property to HeadersConfig
    */

    const request = req.clone({ setHeaders: headersConfig });
    /*
      clone the incoming request and add JWT token in the cloned
      request's Authorization header
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
    */

    /*
      Most interceptors call next.handle() so that the request flows
      through to the next interceptor and, eventually, the backend handler.
    */
    return next.handle(request);
  }

}

/*
  1 - Theory:  HttpInterceptor is a part of the new HttpClientModule,
      - By extending the HttpInterceptor class
        + you can create a custom interceptor to modify http requests
         before they get sent to the Server

    ********** => like Middleware func  in Express JS   ***********

  - The JWT Interceptor intercepts the incoming http requests from
    the application/user
    + and adds JWT token to the request's Authorization header
      if the user is logged in

    =====> The { Interceptor } adds the JWT token in the header of
          the HTTP requests from the client
          + so that it can access the API security end points



    =====> The JWT interceptor works very smarty by not modifying the
          original request made by the user service
          + but cloning the request and adding the JWT token to the
            { request header } and then forwarding the cloned request
            to the backend

          + The value of the token is fetched from the client's
            localStorage
          + if user is logged out, there will be no JWT token in the
            localStorage
          =>  Thus, the user won't be able to access
            the secured API end points


  2 - Provide the { interceptor }
    + The { HttpTokenInterceptor } is a service managed by Angular's
    Dependency Injection system

   2-1-  import it in AppModule
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },

    + b/c This app provides HttpClient in the app's root injector,
      as a side-effect of importing the HttpClientModule
      in AppModule. You should provide interceptors in AppModule as well.

      => In this my project, we import to <core.module>
      => and add <core.module> to <app.module>

      + Note the { multi: true } option. This required setting tells Angular
     that HTTP_INTERCEPTORS is a token for a multiprovider
     that injects an array of values, rather than a single value.


*/

