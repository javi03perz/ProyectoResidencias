import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError} from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private _http: HttpClient) { }

 private url: string = 'https://residencias-23f94-default-rtdb.firebaseio.com'

  public createTask(tarea: any):Observable<any>{
      return this._http.post(`${this.url}/tareas.json`, tarea)
                        .pipe(
                          map( resp => {
                            console.log(resp);
                            return resp
                          }),
                          catchError( (error:Error) => {
                            console.log(error);
                            return throwError(error);
                          })
                        )
  }

 public  updateTarea(tarea: any ) : Observable<any > {
      return this._http.put(`${this.url}/tareas/${tarea.id}.json`, tarea).pipe(
        map( resp => {
          console.log(resp);
          return resp
        }),
        catchError( (error:Error) => {
          console.log(error);
          return throwError(error);
        })
      )
 }

 public getTareas(): Observable<any>{
       return this._http.get(`${this.url}/tareas.json`).pipe(
               map( (resp:any) => {
                 console.log(resp);
                 return  this.crearArreglo(resp);
               })
       )
 }

 private crearArreglo(tareaObj : object){
   const tareas: any[]=[];
   Object.keys(tareaObj).forEach(  key => {
      const tarea:Tarea = tareaObj[key]
       tarea.id = key;
       tareas.push(tarea);
   })
   return tareas;
 }
}
