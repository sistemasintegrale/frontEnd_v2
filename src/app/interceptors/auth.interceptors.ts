import { AuthService } from './../services/auth/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private usuarioService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.usuarioService.getToken()
    if (userToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
        }
      });
    }
    return next.handle(req)
  }


}
