import { Persona } from './persona';

export class Cliente {
  idUsuario?: number;
  persona!: Persona;
  email?: string;
  contrasena?: string;
  idPerfil?: number;
  estado?: number;
  numeroCuenta?: string;
  banco?: string;
  usuarioCreacion?: string;
}
