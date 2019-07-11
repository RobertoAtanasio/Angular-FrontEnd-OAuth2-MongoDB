import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import * as AppUtils from '../shared/comum/app.utils';
import { MessageService } from './message.service';

// Ver estrutura do error definido no BackEnd

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private mensagem: MessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token: string = localStorage.getItem('accessToken');

      if (token) {
        request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
      }

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('Event ', event);
          }
          return event;
        }),
        catchError((error => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 409:
                this.mensagem.showWarning('Falha de registro',
                    'O e-mail utilizado no cadastro está sendo usado por outro usuário!');
                return this.handleErrorGeneral(error);
              case 404:
                this.mensagem.showError('Usuário não encontrado',
                    'Favor verificar se o seu e-mail foi didigato corretamente');
                return this.handleErrorGeneral(error);
              case 403:
                console.log('error 403');
                return this.getAccessToken(request, next);
              case 0:
                console.log('error 0');
                localStorage.removeItem('accessToken');
                return this.getAccessToken(request, next);
              case 401:
                this.mensagem.showError('', error.error.message);
                return this.router.navigate(['login']);
              case 400:
                this.mensagem.showError('Falha de autenticação', 'Usuário ou senha invávalidos');
                return this.router.navigate(['login']);
              case 303:
               console.log('error 303');
               return this.handle303Error(error);
            }
          }
          Observable.throwError(error);
        })));
    }

    private getAccessToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
      return this.apiService.getAccessToken(localStorage.getItem('refreshToken'))
      .switchMap(
        resp => {
          localStorage.setItem('accessToken', resp.access_token);
          const token = localStorage.getItem('accessToken');
          req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
          return next.handle(req);
        }
      );
    }

    handleErrorGeneral(error) {
      if (error === 404 || error === 409 ) {
        return this.apiService.logout();
      }
      return EmptyObservable.create();
    }

    handle303Error(error) {
      if (error.error.message === 'invalidToken') {
        this.mensagem.showError('Vericação de registro', 'Token Inválido, favor solicitar novo token');
        return this.router.navigate(['resend-register-token']);
      } else if (error.error.message === 'expired') {
        this.mensagem.showError('Vericação de registro', 'Token expirou, favor solicitar novo token');
        return this.router.navigate(['resend-register-token']);
      }
      return EmptyObservable.create();
    }
}
