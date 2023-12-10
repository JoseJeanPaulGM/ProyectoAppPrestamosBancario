import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('modalEditar') modalEditar: ElementRef;

  listaPrestamistas: any[] = [];
  login: any;

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
    private usuarioService: UsuarioService
  ) {
    this.login = JSON.parse(localStorage.getItem('login') || '{}');
    this.modalEditar = ElementRef.prototype;
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
          this.listaPrestamistas = data.data;
        });
    }
  }
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

  listarPrestamistas() {}
}
