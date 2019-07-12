import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/core/model/usuarioDTO';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  usuarios: UsuarioDTO[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private mensagem: MessageService
  ) { }

  ngOnInit() {
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
    this.apiService.getUsers().subscribe(users => {
      this.usuarios = users;
    }, error => {
      this.mensagem.showError('Falha de Leitura', 'Houve erro na pesquisa dos usuários. favor tentar mais tarde!');
      console.log('Error ao acessar a lista de usuários! ', error);
    });
  }

  getRole(user: UsuarioDTO) {
    return this.apiService.getRole(user.roles);
  }

  deleteUser(user: UsuarioDTO): void {
    this.apiService.deleteUser(user.id).subscribe(users => {
      // filtro para retirar da lista apresentada na tela o usuário excluído.
      this.usuarios = this.usuarios.filter(u => u.id !== user.id);
      this.mensagem.showSuccess('', 'Usuário excluído com sucesso!');
    }, error => {
      this.mensagem.showError('Falha de Atualização', 'Houve erro na exclusão do usuário. favor tentar mais tarde!');
      console.log('Error ao deletar usuário: ', error);
    });
  }
}
