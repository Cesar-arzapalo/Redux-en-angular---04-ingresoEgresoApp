export class Usuario{

    static contrutorFromFirebase = ({email, uid, nombre}) => new Usuario(uid, nombre, email );

    constructor(public uid: string, public nombre: string, public email: string){

    }
}
