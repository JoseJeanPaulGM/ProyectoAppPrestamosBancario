import { Component } from '@angular/core';
import { Login } from '../../interfaces/login';
import { LoginService } from '../../services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: Login = { email: '', contrasena: '' };
  loginError = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private spinerService: SpinnerService
  ) {}

  ngOnInit(): void {
    console.log(this.loginService.getAuthenticated());
    this.loginService.setAuthenticated(false);
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }

  onSubmit(): void {
    // this.authService.login(this.auth).subscribe(
    //   (data) => {
    //     if (data.success == true) {
    //       this.authService.isLogIn = true;
    //       localStorage.setItem('tokenLogin', JSON.stringify(data.data));
    //     } else {
    //       this.authService.isLogIn = false;
    //     }

    //     this.router.navigateByUrl('/product-list');
    //   },
    //   (error) => {
    //     console.error('Error fetching products:', error);
    //   }
    // );
    if (this.login.email.trim() == '' || this.login.contrasena.trim() == '') {
      this.loginError = true;
      Swal.fire({
        title: 'Login fallido',
        text: 'Los campos no pueden estar vacíos',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#197566',
      });
      return;
    } else {
      if (this.login.email == 'admin' && this.login.contrasena == '123456') {
        this.loginService.setIsAdministrador(true);
        this.loginService.setIsCliente(false);
        this.loginService.setIsPrestamista(false);
      }
      if (this.login.email == 'cliente' && this.login.contrasena == '123456') {
        this.loginService.setIsAdministrador(false);
        this.loginService.setIsCliente(true);
        this.loginService.setIsPrestamista(false);
      }
      if (
        this.login.email == 'prestamista' &&
        this.login.contrasena == '123456'
      ) {
        this.loginService.setIsAdministrador(false);
        this.loginService.setIsCliente(false);
        this.loginService.setIsPrestamista(true);
      }
      this.loginService.setAuthenticated(true);
      this.router.navigate(['/principal']);

      Swal.fire({
        title: 'Login exitoso',
        text: 'Bienvenido a la plataforma de préstamos',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#197566',
      });
    }
  }
}
