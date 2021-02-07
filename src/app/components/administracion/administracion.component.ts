import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Tarea } from './../../models/tarea.model';
import { AjaxError } from 'rxjs/ajax';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(private _tareasService :  TareasService) { }
  public tareas:Tarea[]=[];
  ngOnInit(): void {
    this.getTareas();
  }


  public getTareas():void {
    this._tareasService.getTareas().subscribe( (resp: Tarea[]) =>{
      this.tareas = resp;
    } , (error:AjaxError) => console.error(error))
  }
}
