import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'
import { TareasService } from './../../services/tareas.service';
import { AjaxError } from 'rxjs/ajax';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  public tareaForm: FormGroup;
  constructor(private fb: FormBuilder,
             private tareasService: TareasService,
             private _router: Router) { }

  ngOnInit(): void {

    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      materia: ['', [Validators.required]],
      grupo: ['', Validators.required],
      tarea: ['', [Validators.required ,Validators.minLength(15)]],
      entregada: [false]
    })
  }


  public crearTarea():void {
   console.log(this.tareaForm.value);
   this.tareasService.createTask(this.tareaForm.value)
                     .subscribe( (resp: any) => {
                        console.log(resp);
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Tarea creado con Exito!!',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        this._router.navigate(['/administracion']);
                     }, (error: AjaxError) => console.warn(error))
                     
  }
}
