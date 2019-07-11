import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/core/model/login';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  user = new UserLogin();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private mensagem: MessageService) { }

  ngOnInit() {
  }

  public login() {
    // obter o access token
    this.apiService.login(this.user).subscribe(data => {
      // após o access token, obter os dados do usuário logado.
      this.loginSuccess(data);
    }, erros => {
      this.mensagem.showError('Falha de Login', 'Houve falha no acesso. favor tentar mais tarde!');
      console.log('Erro ao fazer o Login!');
    }
    );
  }

  public loginSuccess(data: any) {
    // obter dados do usuário logado
    localStorage.clear();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    this.apiService.getMainUser(localStorage.getItem('accessToken'))
      .subscribe(user => {
        // abrir a página de bem-vindo
        this.mensagem.showSuccess('', 'Login efetuado com sucesso!');
        this.redirectPage(user);
      }, error => {
        this.mensagem.showError('Falha de Login', 'Houve falha no acesso. favor tentar mais tarde!');
        console.log('Erro ao acessar usuário logado');
        this.apiService.logout();
      });
  }

  public redirectPage(user: any) {
    // salva o objeto do usuário corrente
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['welcome']);
  }
}
