import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/core/model/usuarioDTO';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-resend-registration-token',
  templateUrl: './resend-registration-token.component.html',
  styleUrls: ['./resend-registration-token.component.scss']
})
export class ResendRegistrationTokenComponent implements OnInit {

  usuario = new UsuarioDTO();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private mensagem: MessageService) { }

  ngOnInit() {
  }

  resendToken() {
    this.apiService.resendRegisterToken(this.usuario).subscribe(data => {
      this.mensagem.showSuccess('', 'Novo TOKEN enviado com sucesso!');
      this.router.navigate(['login']);
    }, error => {
      this.mensagem.showError('Falha de Reenvio',
        'Houve erro no reenvio do TOKEN. Favor tentar mais atarde!');
      console.log('Error ao solicitar novo token de acessso!');
    });
  }
}
