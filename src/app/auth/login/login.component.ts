import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading: boolean;
  uiSubscription: Subscription;


  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.crearFormularioLogin();

    this.uiSubscription = this.store.select('ui')
    .subscribe( ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearFormularioLogin(){
    this.loginForm = this.fb.group({
      correo: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(){

    if (this.loginForm.invalid){
      return;
    }

    this.store.dispatch(isLoading());

    const {correo, password} = this.loginForm.value;
    // Swal.fire({
    //   title: 'Validando ingreso',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    this.authService.loginUsuario(correo, password)
      .then((credenciales) => { this.store.dispatch(stopLoading()); this.route.navigate(['/']); /*Swal.close();*/ })
      .catch(err => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Datos no validos',
          text: err.message,
        });
      });
  }

}
