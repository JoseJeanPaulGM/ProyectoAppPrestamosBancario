import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  irAlInicio() {
    this.router.navigate(['/principal']);
  }

  irAlQuienesSomos() {
    this.router.navigate(['/quienes-somos']);
  }

  irAlServicios() {
    this.router.navigate(['/servicios']);
  }

  irAlContacto() {
    this.router.navigate(['/contacto']);
  }

  irAlLogin() {
    this.router.navigate(['/login']);
  }
}
