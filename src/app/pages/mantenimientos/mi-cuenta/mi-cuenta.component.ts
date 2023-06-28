import { RegisterForm } from 'src/app/interfaces/usuario/register-form';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/reporte-historial/cliente';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClienteService } from 'src/app/services/reports/cliente.service';
import { UsuarioService } from 'src/app/services/mantenimientos/usuario.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  public usuario!: UsuarioData;
  public verPassword: boolean = false;
  public titulo = '';
  public formSubmitted = false;
  public clientesNG!: Cliente[];
  public clientesNM!: Cliente[];
  public estados = [
    { value: true, descripcion: 'Activo' }, { value: false, descripcion: 'Inactivo' }
  ]
  constructor(private authservice: AuthService,
    private clienteservice: ClienteService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.usuario = this.authservice.usuario;
    this.usuarioService.getUsuario(this.authservice.usuario.id)
      .subscribe({
        next: (data => {
          this.usuario = data.data;
          this.cargar()
        })
      });
  }
  async cargar() {
    await Promise.all([
      this.cargarClienteNG(),
      this.cargarClienteNM()
    ])

    this.registerForm = new FormGroup({
      nombre: new FormControl(this.usuario ? this.usuario.nombre : '', [Validators.required]),
      apellidos: new FormControl(this.usuario ? this.usuario.apellidos : '', [Validators.required]),
      email: new FormControl(this.usuario ? this.usuario.email : '', [Validators.required, Validators.email]),
      password: new FormControl(this.usuario ? this.usuario.password : '', [Validators.required]),
      estado: new FormControl(this.usuario ? this.usuario.estado : true, [Validators.required]),
      codigoClienteNG: new FormControl({ value: this.usuario ? this.usuario.codigoClienteNG : 0, disabled: false }),
      codigoClienteNM: new FormControl({ value: this.usuario ? this.usuario.codigoClienteNM : 0, disabled: false }),
    });
  }
  registerForm = new FormGroup({
    nombre: new FormControl(this.usuario ? this.usuario.nombre : '', [Validators.required]),
    apellidos: new FormControl(this.usuario ? this.usuario.apellidos : '', [Validators.required]),
    email: new FormControl(this.usuario ? this.usuario.email : '', [Validators.required, Validators.email]),
    password: new FormControl(this.usuario ? this.usuario.password : '', [Validators.required]),
    estado: new FormControl(this.usuario ? this.usuario.estado : true, [Validators.required]),
    codigoClienteNG: new FormControl({ value: this.usuario ? this.usuario.codigoClienteNG : 0, disabled: false }),
    codigoClienteNM: new FormControl({ value: this.usuario ? this.usuario.codigoClienteNM : 0, disabled: false }),
  });


  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid! && this.formSubmitted;
  }
  cargarClienteNM() {
    this.clienteservice.ClientesNovaMotos().subscribe(res => {
      this.clientesNM = res.data.filter(x => x.id === this.usuario.codigoClienteNM);
    });
  }
  cargarClienteNG() {
    this.clienteservice.ClientesNovaGlass().subscribe(res => {
      this.clientesNG = res.data.filter(x => x.id === this.usuario.codigoClienteNG);
    });
  }

  openChangePassword(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      disableClose: false, 
      data: this.usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result.update) {
        const data: RegisterForm = {
          nombre: this.registerForm.controls.nombre.value!,
          apellidos: this.registerForm.controls.apellidos.value!,
          email: this.registerForm.controls.email.value!,
          password: result.newPasss,
          password2: result.newPasss,
          terminos: true,
          estado: this.registerForm.controls.estado.value!,
          codigoClienteNG: this.registerForm.controls.codigoClienteNG.value!,
          codigoClienteNM: this.registerForm.controls.codigoClienteNM.value!,
          admin:true
        }
    
        this.usuarioService
          .modificarUsuario(data, this.usuario.id)
          .subscribe({
            next: ((data) => {
              this.usuarioService.getUsuario(this.authservice.usuario.id)
                .subscribe({
                  next: (data => {
                    this.usuario = data.data;
                    this.cargar()
                  })
                });
              if (data.isSucces) {
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
    })
  }

  editUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;

    const data: RegisterForm = {
      nombre: this.registerForm.controls.nombre.value!,
      apellidos: this.registerForm.controls.apellidos.value!,
      email: this.registerForm.controls.email.value!,
      password: this.registerForm.controls.password.value!,
      password2: this.registerForm.controls.password.value!,
      terminos: true,
      estado: this.registerForm.controls.estado.value!,
      codigoClienteNG: this.registerForm.controls.codigoClienteNG.value!,
      codigoClienteNM: this.registerForm.controls.codigoClienteNM.value!,
      admin:true
    }

    this.usuarioService
      .modificarUsuario(data, this.usuario.id)
      .subscribe({
        next: ((data) => {
          this.usuarioService.getUsuario(this.authservice.usuario.id)
            .subscribe({
              next: (data => {
                this.usuario = data.data;
                this.cargar()
              })
            });
          if (data.isSucces) {
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
}
