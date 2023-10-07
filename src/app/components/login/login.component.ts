import { Component } from '@angular/core';
import { Auth } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  auth: Auth = { user: '', password: '' };
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.authService.getAuthenticated());
    this.authService.setAuthenticated(false);
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
    this.authService.setAuthenticated(true);
    this.router.navigate(['/dashboard']);
    // Ejemplo de mostrar un mensaje de éxito
    Swal.fire('¡Éxito!', 'La operación se completó con éxito.', 'success');
  }
}
