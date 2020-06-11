import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import {map} from 'rxjs/operators';
import { Usuario } from 'src/models/usuario.models';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAurhListener = () => this.auth.authState;

  crearUsuario = (nombre: string, email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password)
    .then( ({user}) => {
      const {uid} = user;
      const newUser = new Usuario(uid, nombre, email);
      return this.firestore.doc(`${uid}/usuario`)
        .set({... newUser});
    })

  loginUsuario = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();

  isAuth = () => this.auth.authState.pipe( map( fbUser => fbUser != null));
}
