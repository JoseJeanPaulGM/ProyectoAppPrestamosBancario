import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  login: any;

  usuario: Cliente = {
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
    numeroCuenta: '',
    banco: '2',
    estado: 1,
    idPerfil: 3,
  };

  constructor(
    private router: Router,
    private spinerService: SpinnerService,
    private loginService: LoginService,
    private clienteService: ClienteService
  ) {}

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
      return;
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
      return;
    }

    if (
      !this.usuario.persona.numeroDocumento ||
      this.usuario.persona.numeroDocumento.length < 8
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa un número de documento.',
      });
      return;
    }

    if (!this.usuario.numeroCuenta || this.usuario.numeroCuenta.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa un número de cuenta.',
      });
      return;
    }

    this.usuario.usuarioCreacion = this.usuario.email;
    this.usuario.persona.email = this.usuario.email;

    this.spinerService.activateSpinner();

    this.clienteService.createCliente(this.usuario).subscribe(
      (data) => {
        console.log(data);
        this.spinerService.deactivateSpinner();
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Se ha registrado correctamente.',
        });
        this.router.navigate(['/solicitud']);
      },
      (error) => {
        console.log(error);
        this.spinerService.deactivateSpinner();
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: 'No se ha podido registrar.',
        });
      }
    );
  }

  irASolitudPrestamo() {
    this.router.navigate(['/solicitud']);
  }
}
