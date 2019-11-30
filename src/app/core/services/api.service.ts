import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
@Injectable()

export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
    /*
      - in Rxjs 6: using throwError(): Observable
        + instead Observable.throw(error)
    */
  }

  // don't need Headers, b/c in Interceptor has Header
  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  // GET request
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
            .pipe(catchError(this.formatErrors));
  }

  // PUT Request
  put(path: string, body: object= {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  // PATCH request
  patch(path: string, body: object= {}): Observable<any> {
    return this.http.patch(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  // delete
  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  /*
    Submit FormData
  */
  postFormData(path: string, body): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }
}


/*
                STEP-1: <Login-and- Register endpoints> require a <POST-request>
        in STEP 3 / 3-1

export class ApiService {
  constructor(private http: HttpClient) {}

  //    STEP 1: ser Headers

  private setHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }

  // STEP 2: handle ERROR
  private formatErrors(error: any) {
    return throwError(error.error);
    //  - in Rxjs 6: using throwError(): Observable
    //    + instead Observable.throw(error)

  }

  // STEP 3: make a POST request
  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
        `${environment.api_url}/${path}`,
        JSON.stringify(body),
        { headers: this.setHeaders() }
      ).pipe(catchError(this.formatErrors));
    }
  }
*/



