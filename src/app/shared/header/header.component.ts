import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public usuarioService: AuthService,
    private router: Router) { }

  logout() {
    this.usuarioService.logOut();
    this.router.navigateByUrl('/login')
  }
}
