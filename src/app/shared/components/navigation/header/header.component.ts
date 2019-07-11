import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import * as AppUtils from '../../../../shared/comum/app.utils';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private mensagem: MessageService) { }

  ngOnInit() { }

  logout() {
    return this.apiService.logout().subscribe(() => {
      this.clearLocalStorage();
      this.router.navigate(['login']);
      this.mensagem.showSuccess('', 'Sessão encessada com sucesso!');
    }, error => {
      this.mensagem.showError('Falha de Logout', 'Houve falha no Logout.');
      console.log('Erro ao deslogar o serviço:', error);
    });
  }

  clearLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
  }

  isAutenticated(): Observable<boolean> {
    return this.apiService.isAuthenticated();
  }
}
