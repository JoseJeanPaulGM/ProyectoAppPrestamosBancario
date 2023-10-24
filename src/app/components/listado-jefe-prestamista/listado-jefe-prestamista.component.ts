import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-jefe-prestamista',
  templateUrl: './listado-jefe-prestamista.component.html',
  styleUrls: ['./listado-jefe-prestamista.component.scss'],
})
export class ListadoJefePrestamistaComponent implements OnInit {
  listaJefesPrestamistas: any[] = [];

  constructor(
    private router: Router,
    private spinerService: SpinnerService,
    private empleadoService: EmpleadoService,
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.usuarioService.listarJefesPrestamistas().subscribe(
      (data) => {
        console.log(data);
        this.listaJefesPrestamistas = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listarJefesPrestamistas() {}
  modificar(data: any) {
    console.log(data);
    //this.router.navigate(['/registro-prestamista', data.idUsuario]);
  }

  eliminar(data: any) {
    console.log(data);
  }
}
