import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { distinctUntilChanged , map, catchError} from 'rxjs/operators';

import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';


@Injectable()

export class UserService {
  // contain current User's info
  private currentUserSubject = new BehaviorSubject<User>({} as User);

  public currentUser$ = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  // confirm that it has User or not
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable().pipe(distinctUntilChanged());

  isFormData = false;

  constructor(private _apiService: ApiService,
              private _http: HttpClient,
              private _jwtService: JwtService) { }

  getCurrentUser(): Observable<User> {
    console.log('get current user');
    return this.currentUser$;
  }

  // add data to Observable
  setAuth(user: User) {
    // save JWT sent from server in localStorage
    this._jwtService.saveToken(user.token);

    // set current user data into Observable
    this.currentUserSubject.next(user);

    // set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  // for login/ register = attemptAuth + router to '/'
  // for login/ register
  attemptAuth(type, credentials): Observable<User> {
    /*
    ==> b/c httpInterceptor is executed when we call HTTP Request
    ==> b/c of this, we use { isFormData } to indicate content of header
      in httpInterceptor
    */
    this.isFormData = false;

    const route = (type === 'login') ? '/login' : '/register';
    return this._apiService.post('/users' + route, credentials)
      .pipe(map(
      data => {
        this.setAuth(data);
        return data;
      }
    ));
  }

  // for logout = removeAuth + router to '/'
  // STEP 5- <s-4>: to remove all User's info on the Client (token, data on Observable)
  removeAuth() {
    // 1 - remove JWT from localStorage
    this._jwtService.destroyToken();

    // 2- ser current user to an empty object
    this.currentUserSubject.next({} as User);

    // set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  /*  Retrieve user's info from Server
    - verify JWT in localStorage with server & load user's info
    - This runs once on apps startup
    NOTE: use on the top of App.component
        so when user load apps on the new page
        => Keep Log-in for User
  */
   // STEP 5- <s-5>
  getUser() {
    this.isFormData = false;
    console.log('get user');
    // If JWT detected, try to get & store user's info
    if (this._jwtService.getToken()) {
      this._apiService.get('/user')
      .subscribe(
        data => this.setAuth(data),
        err => this.removeAuth()
      );
    } else {
      // remove any potential remnants of previous auth states
      this.removeAuth();
    }
  }

  // update entire user's info on Profile
  // update the user on the server (email, pass, etc)
  updateUser(newData): Observable<User> {
    this.isFormData = false;

    return this._apiService.put('/user', newData )
      .pipe(map(data => {
        // update the current User Observable
        this.currentUserSubject.next(data);
        return data;
      }));
  }

  /*
    Submit FormData
  */
  uploadAvatar(image): Observable<any> {
    this.isFormData = true;
    return this._apiService.postFormData('/user/avatar', image)
      .pipe(
        map(data => {
          this.currentUserSubject.next(data);
          return data;
        })
      );
  }


}





/*
              STEP 1: Register with User's info
    <in STEP 3 / 3-1>

export class UserService {
  // contain current User's info
  private currentUserSubject = new BehaviorSubject<User>({} as User);

  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  // confirm that it has User or not
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private _apiService: ApiService,
              private _http: HttpClient) {}


  setAuth(user: User) {
    // set current user data into Observable
    this.currentUserSubject.next(user);

    // set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // attemptAuth()try to implement either Login or Register

  attemptAuth(type, credentials): Observable<User> {
    // login or register
    // Both of them need to setAuth(): confirm User's credentials

    const route = (type === 'login') ? '/login' : '';

    return this._apiService.post(`/users${route}`, {user: credentials})
        .pipe(map(data => {
              // console.log('data=', data); // data = {user: {}}

              // console.log(data.user);

              this.setAuth(data.user);
              return data;
            }
        ));

    // B/c data has a form as
    data = {
        user: {
          bio: ,
          createdAt,
          email,
          idm
          image,
          token,
          updatedAt,
          username
      }
    }

    b/c : after POST request @return An `Observable` of the response,
        with the response body as a JSON object.

  }
}
*/


/*
          STEP 2:  to remove all User's info on the Client (token, data on Observable)

    removeAuth() {
    // 1 - remove JWT from localStorage
    this._jwtService.destroyToken();

    // 2- ser current user to an empty object
    this.currentUserSubject.next({} as User);

    // set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

*/


/*
        STEP 3:  Get user's info from Server
    - verify JWT in localStorage with server & load user's info
    - This runs once on apps startup

 getUser() {
  // If JWT detected, try to get & store user's info
  if (this._jwtService.getToken()) {
    this._apiService.get('/user')
    .subscribe(
      data => this.setAuth(data.user),
      err => this.removeAuth()
    );
  } else {
    // remove any potential remnants of previous auth states
    this.removeAuth();
  }

*/
