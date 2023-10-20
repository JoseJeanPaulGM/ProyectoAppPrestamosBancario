import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-prestamista',
  templateUrl: './registro-prestamista.component.html',
  styleUrls: ['./registro-prestamista.component.scss'],
})
export class RegistroPrestamistaComponent {
  usuario: Usuario = {
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
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.usuario);
  }
}
