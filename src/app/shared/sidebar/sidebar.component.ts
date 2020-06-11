import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  salir(){
    Swal.fire({
      title: 'Saliendo de la sesion',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.logout()
      .then( () => {this.route.navigate(['/login']); Swal.close(); })
      .catch( err => {
        Swal.fire({
           icon: 'error',
           title: 'Algo salio mal',
           text: err.message
        });
      });
  }

}
