import { Component, OnInit } from '@angular/core';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  public usuario!: UsuarioData;
  constructor(private authservice: AuthService) { }
  ngOnInit(): void {
    this.usuario = this.authservice.usuario;
  }

}
