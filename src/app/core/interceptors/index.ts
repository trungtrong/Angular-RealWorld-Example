import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpTokenInterceptor } from './http.token.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
];

/*
  - we should do as the above, b/c we can add more
    { Interceptor } in the One <represented Interceptor>
*/

/*
  HTTP_INTERCEPTORS: you need to import
    import { HTTP_INTERCEPTORS } from '@angular/common/http';

*/
