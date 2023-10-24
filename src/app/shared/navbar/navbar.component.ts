import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { set } from 'date-fns';
import { el, is } from 'date-fns/locale';
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
      if (data == false) {
        this.listaMenus = [];
        this.isAuthenticated = false;
        console.log(this.isAuthenticated);
      } else {
        this.isAuthenticated = true;
        let jsonText = localStorage.getItem('login');
        console.log('nvae', jsonText);
        let login = JSON.parse(jsonText ? jsonText : '');
        console.log(login);
        this.nombreUsuario = login.email;
      }
    });
  }
  ngOnInit(): void {}

  irAlInicio() {
    this.router.navigate(['/principal']);
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
