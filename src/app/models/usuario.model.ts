

export class Usuario {
    
    static fromFirebase({uid, email, nombre, perfil}){
        return new Usuario( uid,nombre,perfil, email);
    }
    constructor(public uid:string,
                public nombre:string,
                public perfil:string,
                public email:string){}
}