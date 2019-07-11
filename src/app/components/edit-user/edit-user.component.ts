import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioDTO } from 'src/app/core/model/usuarioDTO';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  usuario = new UsuarioDTO();
  idUsuario: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private mensagem: MessageService
  ) { }

  ngOnInit() {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    this.apiService.getUserById(this.idUsuario).subscribe(user => {
      this.usuario = user;
    }, error => {
      this.mensagem.showError('Falha de Leitura', 'Houve erro ao editar o usuário. Favor tentar mais tarde!');
      console.log('Error ao pegar usuário por ID! ', error);
    });
  }

  update(): void {
    this.usuario.id = this.idUsuario;
    this.apiService.updateUser(this.usuario).subscribe(() => {
      this.mensagem.showSuccess('', 'Registro atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.mensagem.showError('Falha de Atualização', 'Houve erro na atualização. Favor tentar mais tarde!');
      console.log('Error ao atualizar o usuário', error);
    });
  }

  goBack() {
    this.location.back();
  }
}
