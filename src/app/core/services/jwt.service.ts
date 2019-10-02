import { Injectable } from '@angular/core';

@Injectable()

export class JwtService {

  /*
   - check if the current user is logged in
   - If the user making the request is logged in,
      he will have JWT token in it's local storage
  */
  getToken(): string {
    return window.localStorage.jwtToken;
  }

  saveToken(token: string) {
    window.localStorage.jwtToken = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}

/*
    <S-2> <jwt.-service.ts>
    - To get / save / destroy Token in LocalStorage

*/
