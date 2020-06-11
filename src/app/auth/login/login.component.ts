import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.crearFormularioLogin();
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

    const {correo, password} = this.loginForm.value;
    Swal.fire({
      title: 'Validando ingreso',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.loginUsuario(correo, password)
      .then((credenciales) => { this.route.navigate(['/']); Swal.close(); })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Datos no validos',
          text: err.message,
        });
      });
  }

}
