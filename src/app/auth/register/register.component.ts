import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
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

    Swal.fire({
      title: 'Registrando al usuario',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.crearUsuario(nombre, correo, password)
      .then( () =>  {this.router.navigate(['/']); Swal.close(); })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Datos no validos',
          text: err.message,
        });
      });
  }

}
