import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { UsuarioDTO } from 'src/app/core/model/usuarioDTO';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {

  public usuario = new UsuarioDTO();
  private unsubscribeMessage = new Subject();
  submeteu = false;

  constructor(
    private apiService: ApiService,
    private location: Location,
    private router: Router,
    private mensagem: MessageService) { }

  ngOnInit() {
    this.mensagem.notfyObservable$.pipe(takeUntil(this.unsubscribeMessage)).subscribe(result => {
      if (result === true) {
        this.submeteu = false;
      }
    } );
  }

  save(): void {
    this.submeteu = true;
    this.apiService.registerUser(this.usuario).subscribe(data => {
      this.mensagem.showSuccess('', 'Usuário registrado com sucesso. Verificar seu e-mail para liberar seu acesso!');
      this.router.navigate(['login']);
    }, error => {
      this.mensagem.showError('Faha de Registro',
          'Houve erro no registro do usuário.Favor tentar mais tarde!');
      console.log('Erro ao criar o usuário:', error);
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.unsubscribeMessage.next();
    this.unsubscribeMessage.complete();
  }
}
