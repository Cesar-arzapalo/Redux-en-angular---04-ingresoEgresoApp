import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  uiSubscription: Subscription;
  loading: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading )
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearFormulario(){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  crearUsuario(){
    if (this.form.invalid){ return; }
    const {nombre, correo, password} = this.form.value;

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Registrando al usuario',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    this.authService.crearUsuario(nombre, correo, password)
      .then( () =>  {this.store.dispatch(stopLoading()); this.router.navigate(['/']); /*Swal.close();*/ })
      .catch( err => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Datos no validos',
          text: err.message,
        });
      });
  }

}
