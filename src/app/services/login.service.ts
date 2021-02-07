import { Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventEmitter } from 'events';

import { Observable, of, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 public userSubscription : Subscription;
 private _user: Usuario;
 private stateUser = new Subject<any>();
 public stateUserObs$ = this.stateUser.asObservable();
  constructor(public auth: AngularFireAuth,
              private _firestore: AngularFirestore,) { }


  public crearUusario(nombre: string, email:string, perfil:string, password:string):Promise<any> {

      return this.auth.createUserWithEmailAndPassword(email, password)
                    .then( ({user}) => {
                     const newUser = new Usuario(user.uid , nombre , perfil, user.email);
                        return   this._firestore.doc(`${user.uid}/usuario`).set( {...newUser})
                  })
     }

public loginUsuario(email:string, password:string):Promise<any> {
      return this.auth.signInWithEmailAndPassword(email, password);
}

 public logout():Promise<any> {
  return this.auth.signOut();
 }

 public initAuthListener(){
  this.auth.authState.subscribe( fuser => {
    console.log(fuser);
    if(fuser) {
       //existe
       //para obtenr el nodo de ese usuario en firebase
     this.userSubscription =   this._firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (fireStoreUser: any) => {
          const user = Usuario.fromFirebase(fireStoreUser)
          this._user = user;
          if(this._user != null || undefined){
           console.log('es diferente de  vacio');
            this.stateUser.next(this._user);
          }
          // console.log(this._user);
          //  localStorage.setItem('user', this._user.nombre);
        })
    }else {
       console.log('llamar al unset user ');
       this._user = null;
       this.userSubscription?.unsubscribe();
    }
  })
}

public isAuth():Observable<boolean> {
  return this.auth.authState.pipe(
    //ESTA INSTRUCCION REGREESA UN BOOLEANO
    map( fUser =>  fUser != null)
  )
}


public getUserPerfil(){
   return of(this._user);
}

}
