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
  private _user: Usuario;
  private _mobileQueryListener: () => void;
  constructor(media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef, 
    private loginService: LoginService,
    private _router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
       
   }

  ngOnInit(): void {
 

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  public logout() : void {
    console.log('vamos acerrar cesion');
    this.loginService.logout().then( () => {
       this._router.navigate(['/login']);
    })
  }
 
}
