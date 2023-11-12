export interface Cliente {
  idCliente: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numeroDocumento: string;
  correo: string;
  telefono: string;
  direccion: string;
  estado: number;
  tipoDocumento: number;
  usuarioCreacion: string;
  fechaCreacion: Date;
  usuarioActualizacion: string;
  fechaActualizacion: Date;
}
