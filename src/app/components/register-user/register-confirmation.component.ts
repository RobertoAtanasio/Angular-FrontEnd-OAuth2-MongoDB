import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-register-user',
  template: `
        <div class="view overlay zoom">
            <p class="white-text">Verificando solicitação de registro de usuário</p>
        </div>
  `
})
export class RegisterConfirmationComponent implements OnInit {

  public token: string;

  constructor(private apiService: ApiService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private mensagem: MessageService) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.apiService.confirmationRegisterToken(this.token).subscribe(register => {
        console.log('Confirmação de registro OK!');
        this.mensagem.showSuccess('', 'Confirmação de Registro OK!');
        this.router.navigate(['login']);
    }, error => {
        this.mensagem.showError('Falha de Confirmação', 'Houve erro na confirmação do registro. Favor tentar mais tarde!');
        console.log('Error Confirmação de registro!', error);
        this.router.navigate(['resend-register-token']);
    });
  }

  goBack() {
    this.location.back();
  }
}
