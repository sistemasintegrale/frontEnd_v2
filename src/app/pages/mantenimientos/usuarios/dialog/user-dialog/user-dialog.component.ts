import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/interfaces/reporte-historial/cliente';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/mantenimientos/usuario.service';
import { ClienteService } from 'src/app/services/reports/cliente.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  public verPassword: boolean = false;
  public titulo = '';
  public formSubmitted = false;
  public registerForm!: FormGroup;
  public clientesNG!: Cliente[];
  public clientesNM!: Cliente[];
  public admin!: boolean;
  public estados = [
    { value: true, descripcion: 'Activo' }, { value: false, descripcion: 'Inactivo' }
  ]

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    public usuarioService: UsuarioService,
    public snackBar: MatSnackBar,
    private clienteservice: ClienteService,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public usuario: UsuarioData
  ) {
    if (this.usuario !== null) {
      this.titulo = 'Modificar usuario ' + this.usuario.nombre;
    } else {
      this.titulo = 'Nuevo usuario';

    }
  }
  async ngOnInit() {




    this.registerForm = new FormGroup({
      nombre: new FormControl(this.usuario ? this.usuario.nombre : '', [Validators.required]),
      apellidos: new FormControl(this.usuario ? this.usuario.apellidos : '', [Validators.required]),
      email: new FormControl(this.usuario ? this.usuario.email : ''),
      password: new FormControl(this.usuario ? this.usuario.password : '', [Validators.required]),
      estado: new FormControl(this.usuario ? this.usuario.estado : true, [Validators.required]),
      codigoClienteNG: new FormControl(this.usuario ? this.usuario.codigoClienteNG : 0),
      codigoClienteNM: new FormControl(this.usuario ? this.usuario.codigoClienteNM : 0),
      admin: new FormControl(this.usuario ? this.usuario.admin : false),
    });
    await Promise.all([
      this.cargarClienteNG(),
      this.cargarClienteNM()
    ])
  }


  cargarClienteNM() {
    this.clienteservice.ClientesNovaMotos().subscribe(res => {
      this.clientesNM = res.data;
    });
  }
  cargarClienteNG() {
    this.clienteservice.ClientesNovaGlass().subscribe(res => {
      this.clientesNG = res.data;
    });
  }

  close() {
    this.dialogRef.close();
  }

  validarUsuario(): boolean {
    const usuario = this.registerForm.value;
    if(!usuario.admin)
    {
      if(usuario.codigoClienteNG === 0 && usuario.codigoClienteNM === 0){
        Swal.fire(
          'Alerta!',
          `Si el Usuario ${usuario.nombre} no es administrador, seccione cliente Nova Glass o Nova Motos`,
          'error'
        );
        return false  ;
      }

    }
    return true;
  }

  addUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;
    if (!this.validarUsuario())
      return
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: ((data) => {
          if (data.isSucces) {
            this.dialogRef.close(true);
            Swal.fire(
              'Usuario Creado',
              `Usuario ${data.data.nombre} fué creado correctamente`,
              'success'
            );
          }
        })
      }
      );
  }

  editUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;
    if (!this.validarUsuario())
      return
    this.usuarioService
      .modificarUsuario(this.registerForm.value, this.usuario.id)
      .subscribe({
        next: ((data) => {
          if (data.isSucces) {
            this.dialogRef.close(true);
            Swal.fire(
              'Usuario modificado',
              `Usuario ${data.data.nombre} fué modificado correctamente`,
              'success'
            );
          }
        })
      }
      );
  }

  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid! && this.formSubmitted;
  }



  cambiarTipo(valor: boolean) {
    let elemento: any = document.getElementById('contraseña');
    this.verPassword = valor;
    if (valor) {
      elemento.type = "text";
    } else {
      elemento.type = "password";
    }

  }


}
