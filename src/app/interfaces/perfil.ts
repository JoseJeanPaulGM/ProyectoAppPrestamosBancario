import { PerfilOpcion } from './perfil-opcion';

export interface Perfil {
  idPerfil: number;
  descripcion: string;
  estado: number;
  perfilOpcion: PerfilOpcion[];
}
