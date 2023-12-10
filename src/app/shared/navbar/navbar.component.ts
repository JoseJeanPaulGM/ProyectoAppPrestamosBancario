import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  listaMenus: any[] = [];
  isAuthenticated: boolean = false;
  nombreUsuario: string = '';
  idPerfil: number = 0;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private spinnerService: SpinnerService
  ) {
    this.loginService.getMenus().subscribe((data: any) => {
      if (data.length > 0) {
        this.listaMenus = data;
      }
    });
    this.loginService.getAuthenticated().subscribe((data: any) => {
      if (data === false) {
        this.listaMenus = [];
        this.isAuthenticated = false;
      } else {
        this.isAuthenticated = true;
        let jsonText = localStorage.getItem('login');
        let login = JSON.parse(jsonText ? jsonText : '');
        this.nombreUsuario =
          login.idPerfil === 4 ? login.persona.nombres : login.email;
        this.idPerfil = login.idPerfil;
      }
    });
  }

  ngOnInit(): void {}

  irAlInicio() {
    if (this.idPerfil === 4) {
      this.router.navigate(['/principal']);
    } else {
      this.router.navigate(['/consulta-solicitud']);
    }
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }

  irAlLogin() {
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    this.spinnerService.activateSpinner();
    this.loginService.logout();
    this.router.navigate(['/principal']);
    setTimeout(() => {
      this.spinnerService.deactivateSpinner();
      document.location.reload();
    }, 500);
  }
}
