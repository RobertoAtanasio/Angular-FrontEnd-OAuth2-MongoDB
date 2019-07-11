import { Injectable } from '@angular/core';
import { UserLogin } from './model/login';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HEADERS_COMMUN } from './../shared/comum/app.utils';
import * as AppUtils from '../shared/comum/app.utils';
import { UsuarioDTO } from './model/usuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${AppUtils.BASE_URL}` + 'api/users';
  }

  login(user: UserLogin): Observable <any> {
    const params = new HttpParams()
      .set('username', user.email)
      .set('password', user.password)
      .set('grant_type', 'password');

    const options = {
        headers: AppUtils.HEADERS_COMMUN, params
      };

    return this.httpClient.post(AppUtils.URL_TOKEN, null, options);
  }

  getMainUser(token: any): Observable <any> {
    return this.httpClient.get<any>(`${this.baseUrl}` + '/main', AppUtils.HEADERS_TOKEN);
  }

  getAccessToken(refreshToken): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    const options = {
        headers: AppUtils.HEADERS_COMMUN, params
    };
    return this.httpClient.post(AppUtils.URL_TOKEN, null, options);
  }

  registerUser(usuario: UsuarioDTO): Observable<any> {
    // const header = new HttpHeaders({
    //   Authorization: 'Basic ' + btoa('cliente' + ':' + '123')
    // });
    // return this.httpClient.post<any>(AppUtils.REGISTER_URL, usuario, { headers: header } );
    return this.httpClient.post<any>(AppUtils.REGISTER_URL, usuario, { headers: HEADERS_COMMUN } );
  }

  confirmationRegisterToken(tokenUsuario: string): Observable<any> {
    const params = new HttpParams()
      .set('token', tokenUsuario);
    const options = { headers: AppUtils.HEADERS_COMMUN, params };
    return this.httpClient.get<any>(AppUtils.CONFIRM_REGISTER_URL, options);
  }

  resendRegisterToken(usuario: UsuarioDTO): Observable<any> {
    const params = new HttpParams()
      .set('email', usuario.email);
    const options = { headers: AppUtils.HEADERS_COMMUN, params };
    return this.httpClient.get<any>(AppUtils.RESEND_REGISTER_TOKEN_URL, options);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`, AppUtils.HEADERS_TOKEN);
  }

  getRole(roles: Array<any>) {
    let role: any;
    if (this.isAuthenticated() && roles) {
      if (roles.length > 0) {
        roles.forEach(r => {
          role = r.name;
        });
      }
      return role;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean> (observer => {
      if (JSON.parse(localStorage.getItem('currentUser'))) {
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
      }
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}}`, AppUtils.HEADERS_TOKEN);
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`, AppUtils.HEADERS_TOKEN);
  }

  updateUser(usuario: UsuarioDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${usuario.id}`, usuario, AppUtils.HEADERS_TOKEN);
  }

  logout(): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL}` + 'api/logout', AppUtils.HEADERS_TOKEN);
  }
}
