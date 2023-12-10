import { Component, OnInit } from '@angular/core';
import { Login } from '../../interfaces/login';
import { LoginService } from '../../services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: Login = { email: '', contrasena: '' };
  loginError = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loginService.setAuthenticated(false);
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }

  onSubmit(): void {
    this.spinnerService.activateSpinner();
    setTimeout(() => {
      this.loginService.login(this.login).subscribe(
        (data) => {
          if (data.success === true) {
            console.log(data.data);
            localStorage.setItem('login', JSON.stringify(data.data));
            this.loginService.setAuthenticated(true);
            this.loginService.setMenus(data.data.modulos);
            Swal.fire({
              title: 'Login exitoso',
              text: 'Bienvenido a la plataforma de préstamos',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#197566',
            });
            if (data.data.idPerfil == 1) {
              this.router.navigateByUrl('/listado-jefe-prestamista');
            } else if (data.data.idPerfil == 2) {
              this.router.navigateByUrl('/listado-prestamista');
            } else if (data.data.idPerfil == 3) {
              this.router.navigateByUrl('/consulta-solicitud');
            } else if (data.data.idPerfil == 4) {
              this.router.navigateByUrl('/principal');
            }
          } else {
            this.loginService.setAuthenticated(false);
            Swal.fire({
              title: 'Error',
              text: 'Credenciales incorrectas',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#197566',
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'Login Incorrecto',
            text: error.error.message || 'Ocurrió un error en el Servidor.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#197566',
          });
          this.loginService.setAuthenticated(false);
          console.error('Error de Login:', error);
        }
      );
    }, 500);
    this.spinnerService.deactivateSpinner();
  }
}
