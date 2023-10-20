import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAdministrador: boolean = false;
  isCliente: boolean = false;
  isPrestamista: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.getIsAdministrador().subscribe((value: boolean) => {
      this.isAdministrador = value;
    });
    this.loginService.getIsCliente().subscribe((value: boolean) => {
      this.isCliente = value;
    });
  }

  irAlInicio() {
    this.router.navigate(['/principal']);
  }

  irAlQuienesSomos() {
    this.router.navigate(['/quienes-somos']);
  }

  irAlServicios() {
    this.router.navigate(['/servicios']);
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }

  irAlRegistroPrestamista() {
    this.router.navigate(['/registro-prestamista']);
  }

  irAlLogin() {
    this.router.navigate(['/login']);
  }
}
