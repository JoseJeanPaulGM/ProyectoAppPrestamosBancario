import { Persona } from './persona';

export interface Usuario {
  email: string;
  contrasena: string;
  persona: Persona;
  estado: number;
  idPerfil: number;
}
