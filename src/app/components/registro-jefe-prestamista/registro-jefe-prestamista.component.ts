import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-jefe-prestamista',
  templateUrl: './registro-jefe-prestamista.component.html',
  styleUrls: ['./registro-jefe-prestamista.component.scss'],
})
export class RegistroJefePrestamistaComponent implements OnInit {
  login: any;
  usuario: Empleado = {
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
    idPerfil: 2,
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
    private empleadoService: EmpleadoService
  ) {
    this.login = JSON.parse(localStorage.getItem('login') || '{}');
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.usuario.email || !this.usuario.email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa un correo electrónico válido.',
      });
      return; // Detén la ejecución
    }
    if (!this.usuario.contrasena || this.usuario.contrasena.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa una contraseña.',
      });
      return; // Detén la ejecución
    }
    if (
      !this.usuario.persona.nombres ||
      this.usuario.persona.nombres.length < 1
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa un nombre.',
      });
      return; // Detén la ejecución
    }
    if (
      !this.usuario.persona.apellidoPaterno ||
      this.usuario.persona.apellidoPaterno.length < 1
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa un apellido paterno.',
      });
      return; // Detén la ejecución
    }
    if (
      !this.usuario.persona.apellidoMaterno ||
      this.usuario.persona.apellidoMaterno.length < 1
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa un apellido materno.',
      });
      return; // Detén la ejecución
    }

    this.usuario.usuarioCreacion = this.login.email;

    this.spinerService.activateSpinner();
    this.empleadoService.createEmpleado(this.usuario).subscribe(
      (data) => {
        console.log(data);
        if (data.success == true) {
          this.spinerService.deactivateSpinner();
          Swal.fire({
            title: 'Registro exitoso',
            text: 'Se ha registrado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#197566',
          });
        } else {
          this.spinerService.deactivateSpinner();
          Swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#197566',
          });
        }
      },
      (error) => {
        console.error('Error de registro:', error);
        this.spinerService.deactivateSpinner();
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#197566',
        });
      }
    );
  }
}
