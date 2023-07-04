import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public usuarioService: AuthService,
    private router: Router) { }

  logout() {
    Swal.fire({
      title: 'Salir',
      text: `Desea salir del sistema ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.logOut();
        this.router.navigateByUrl('/login')
      }
    })

  }
}
