import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public showMenu = false;
  shouldRun = true;
  mobileQuery: MediaQueryList;
  public _user: string;
  public perfil: string;
  private _mobileQueryListener: () => void;
  constructor(media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef, 
    public loginService: LoginService,
    private _router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
       this._user = '';
   }

  ngOnInit(): void {
  

 this.loginService.stateUserObs$.subscribe( resp => {
   console.log('*****', resp);
   this._user= resp.nombre;
   this.perfil = resp.perfil;
 })
//  setTimeout(() => {
//   this.loginService.getUserPerfil().subscribe(  user=> {
//     console.log(user);
//   })
//  }, 1000);
   
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  public logout() : void {
    console.log('vamos acerrar cesion');
    this.loginService.logout().then( () => {
       this._router.navigate(['/login']);
       localStorage.removeItem('user')
    })
  }
 
}
