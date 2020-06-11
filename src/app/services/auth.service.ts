import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as Auth from '../auth/auth.action';

import {map} from 'rxjs/operators';
import { Usuario } from 'src/models/usuario.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store<AppState>) { }

  initAurhListener = () => this.auth.authState.subscribe(fuser => {
      if (fuser){
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((firestoreUser: any) => {
          const user = Usuario.contrutorFromFirebase(firestoreUser);
          this.store.dispatch(Auth.setUser({user}));
        });
      }else{
        this.userSubscription.unsubscribe();
        this.store.dispatch(Auth.unSetUser());
      }
  })

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
