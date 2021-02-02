import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public registerForm: FormGroup;
  public cargando:boolean = false;
  constructor(private fb: FormBuilder,
              private _router: Router,
              private _login: LoginService) { }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  public crearUsuario():void {
    console.log(this.registerForm.value);
    if(this.registerForm.invalid){
      return;
    }
    this.cargando = true;
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    const { nombre , correo,  password } = this.registerForm.value;
   console.log('vamos a firebase');
    this._login.crearUusario(nombre, correo,password)
         .then( credenciales => {
           console.log(credenciales);
           
           Swal.close();
           this._router.navigate(['/']);
         })
         .catch( error => {
           this.cargando = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
         });
  }
}
