import { Cliente } from './cliente';

export class Solitud {
  idSolicitud?: number;
  idPrestatario?: number;
  idPrestamista?: number;
  monto?: number;
  concepto?: string;
  interes?: number;
  cantidadCuotas?: number;
  cuentaBancaria?: string;
  observaciones?: string;
  estado?: number;
  usuarioCreacion?: string;
}
