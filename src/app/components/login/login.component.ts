import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _loginService: LoginService) { }
 
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  public login(): void {
    if(this.loginForm.invalid){
      return
    }
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    const {email , password} = this.loginForm.value; 
    this._loginService.loginUsuario( email, password)
        .then( user=> {
          console.log('%c login con exito ','color:red;font-size:32px', user.user.email);
          localStorage.setItem('email', user.user.email)
          Swal.close();
          this._router.navigate(['/']);
        })
        .catch( error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
        });
    
  }
  public register(): void {
       this._router.navigate(['/register']);
  }
}
