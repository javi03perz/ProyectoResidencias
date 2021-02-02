import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _loginService: LoginService,
             private _router : Router){}
  canActivate(): Observable<boolean>{
    return this._loginService.isAuth()
               .pipe(
                 tap( estado => {
                   if(!estado){ this._router.navigate(['/login'])}
                 })
               )
  }
  
}
