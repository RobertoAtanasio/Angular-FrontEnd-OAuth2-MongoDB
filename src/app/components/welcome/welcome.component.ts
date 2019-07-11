import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/core/model/usuarioDTO';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public usuario = new UsuarioDTO();

  constructor() { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('currentUser'));
  }

}
