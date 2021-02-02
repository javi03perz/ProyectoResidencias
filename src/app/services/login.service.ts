import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 public userSubscription : Subscription;
 private _user: Usuario;
 get user(){
  return this._user;
}
  constructor(public auth: AngularFireAuth,
              private _firestore: AngularFirestore,) { }


  public crearUusario(nombre: string, email:string, password:string):Promise<any> {

      return this.auth.createUserWithEmailAndPassword(email, password)
                    .then( ({user}) => {
                     const newUser = new Usuario(user.uid , nombre , user.email);
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
           console.log('obten firebase', this._user);
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
}
