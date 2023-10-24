import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empleado } from '../../interfaces/empleado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-prestamista',
  templateUrl: './listado-prestamista.component.html',
  styleUrls: ['./listado-prestamista.component.scss'],
})
export class ListadoPrestamistaComponent {
  listaPrestamistas: any[] = [];

  login: any;

  constructor(
    private router: Router,
    private spinerService: SpinnerService,
    private empleadoService: EmpleadoService,
    private usuarioService: UsuarioService
  ) {
    this.login = JSON.parse(localStorage.getItem('login') || '{}');
  }

  ngOnInit(): void {
    console.log(this.login);
    if (this.login.idPerfil == 1) {
      this.usuarioService.listarPrestamistas().subscribe((data) => {
        console.log(data);
        this.listaPrestamistas = data.data;
      });
    } else if (this.login.idPerfil == 2) {
      this.usuarioService
        .listarPrestamistasPorJefe(this.login.email)
        .subscribe((data) => {
          console.log(data);
          this.listaPrestamistas = data.data;
        });
    }
  }
  modificar(data: any) {
    console.log(data);
    //this.router.navigate(['/registro-prestamista', data.idUsuario]);
  }

  eliminar(data: any) {
    console.log(data);
  }

  listarPrestamistas() {}
}
