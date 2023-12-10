import { CuotaPrestamo } from './cuota-prestamo';
import { Solitud } from './solitud';

export class Prestamo {
  idPrestamo?: number;
  solicitud?: Solitud;
  idPrestamista?: number;
  idGrupoPrestamista?: number;
  idPrestatario?: number;
  montoTotal?: number;
  montoInteres?: number;
  numeroCuotas?: number;
  tasaInteres?: number;
  fechaInicio?: string;
  fechaVencimiento?: string;
  estado?: number;
  usuarioCreacion?: string;
  fechaCreacion?: string;
  usuarioModificacion?: string;
  fechaModificacion?: string;
  cuotasPrestamo?: CuotaPrestamo[];
}
