import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-user-model',
  templateUrl: './delete-user-model.component.html',
  styleUrls: ['./delete-user-model.component.scss']
})
export class DeleteUserModelComponent implements OnInit {

  @ViewChild('deleteUserModal', {read: false, static: false}) public deleteUserModal;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Curso de Spring Boot e Angular 7';
  recebePergunta = 'Deseja realmente deletar este usuário?';

  constructor() { }

  ngOnInit() {
  }

  onClose(event: any) {
    console.log(event);
  }

  show() {
    this.deleteUserModal.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteUserModal.hide();
  }
}
