import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/interfaces/empleado';

@Component({
  selector: 'app-listado-jefe-prestamista',
  templateUrl: './listado-jefe-prestamista.component.html',
  styleUrls: ['./listado-jefe-prestamista.component.scss'],
})
export class ListadoJefePrestamistaComponent implements OnInit {
  @ViewChild('modalEditar') modalEditar: ElementRef;

  login: any;
  listaJefesPrestamistas: any[] = [];

  usuario: Empleado = {
    idUsuario: 0,
    email: '',
    contrasena: '',
    persona: {
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      numeroDocumento: '',
      direccion: '',
      telefono: '',
      email: '',
      estado: 1,
      tipoDocumento: 1,
    },
    estado: 1,
    idPerfil: 3,
    grupo: {
      idGrupo: 0,
      descripcion: '',
      estado: 1,
    },
    usuarioCreacion: '',
  };
  constructor(
    private router: Router,
    private spinerService: SpinnerService,
    private empleadoService: EmpleadoService,
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {
    this.login = JSON.parse(localStorage.getItem('login') || '{}');
    this.modalEditar = ElementRef.prototype;
  }

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
  empleadoSeleccionado(data: any) {
    console.log(data);
    this.usuario = data;
    this.usuario.persona.tipoDocumento = data.persona.tipoDocumento.idDocumento;
  }

  modificar() {
    if (this.usuario.idUsuario === 0 || this.usuario.idUsuario == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, seleccione un prestamista.',
      });
      return;
    }
    this.spinerService.activateSpinner();
    this.empleadoService.updateEmpleado(this.usuario).subscribe(
      (data) => {
        this.spinerService.deactivateSpinner();

        Swal.fire({
          icon: 'success',
          title: 'Modificación exitosa',
          text: 'Prestamista modificado correctamente.',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        // this.modalEditar.nativeElement.style.display = 'none';
      },
      (error) => {
        this.spinerService.deactivateSpinner();
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error de validación',
          text: error.error.message,
        });
      }
    );

    //this.router.navigate(['/registro-prestamista', data.idUsuario]);
  }

  eliminar(data: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#197566',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinerService.activateSpinner();
        this.empleadoService.deleteEmpleado(data.idUsuario).subscribe(
          (data) => {
            this.spinerService.deactivateSpinner();
            Swal.fire({
              icon: 'success',
              title: 'Eliminación exitosa',
              text: 'Prestamista eliminado correctamente.',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          },
          (error) => {
            this.spinerService.deactivateSpinner();
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error de validación',
              text: error.error.message,
            });
          }
        );
      }
    });
  }
}
