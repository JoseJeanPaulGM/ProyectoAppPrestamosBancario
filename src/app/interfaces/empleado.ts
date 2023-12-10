import { Grupo } from './grupo';
import { Persona } from './persona';

export interface Empleado {
  idUsuario?: number;
  persona: Persona;
  email?: string;
  contrasena?: string;
  idPerfil?: number;
  estado?: number;
  usuarioCreacion?: string;
  grupo: Grupo;
}
