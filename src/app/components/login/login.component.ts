import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public login(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Acceso correcto',
      showConfirmButton: false,
      timer: 1500
    })
    this._router.navigate(['/']);
    
  }
  public register(): void {
       this._router.navigate(['/register']);
  }
}
