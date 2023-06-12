import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: AuthService
  ) { }

  public loginForm: any = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    remember: [JSON.parse(localStorage.getItem('remember')!) || false]
  });

  login() {
    console.log(123)
    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        resp => {
          if (resp.isSucces) {
            this.router.navigateByUrl('/');
            if (this.loginForm.get('remember').value) {
              localStorage.setItem('email', this.loginForm.get('email').value)
              localStorage.setItem('remember', this.loginForm.get('remember').value)
            } else {
              if (localStorage.getItem('email')) {
                localStorage.removeItem('email');
                localStorage.removeItem('remember');
              }
            }
          } else {
            Swal.fire('Error', resp.mensaje, 'error');
          }

        }, (err) => {
          console.log(err)
        }
      );


  }
}
