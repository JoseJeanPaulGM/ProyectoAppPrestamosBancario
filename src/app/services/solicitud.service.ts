import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'http://localhost:8095/api/v1/solicitud';

  constructor(private http: HttpClient) {}

  getSolicitudes(): Observable<any> {
    return this.http.get(this.apiUrl + '/listar');
  }

  getSolicitudesByEstado(estado: string): Observable<any> {
    return this.http.get(this.apiUrl + '/solicitudes/' + estado);
  }

  getSolicitudesByPrestamista(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/prestamista/' + id);
  }

  getSolicitudesByCliente(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/cliente/' + id);
  }

  getSolicitudesByJefePrestamista(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/jefePrestamista/' + id);
  }

  getSolicitud(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/solicitudes/' + id);
  }

  createSolicitud(solicitud: any): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar', solicitud);
  }

  updateSolicitud(solicitud: any): Observable<any> {
    return this.http.put(this.apiUrl + '/actualizar', solicitud);
  }

  aprobarSolicitud(
    idSolicitud: number,
    SolicitudPrestamo: any
  ): Observable<any> {
    return this.http.put(
      this.apiUrl + '/aprobar/' + idSolicitud,
      SolicitudPrestamo
    );
  }

  rechazarSolicitud(
    idSolicitud: number,
    SolicitudPrestamo: any
  ): Observable<any> {
    return this.http.put(
      this.apiUrl + '/rechazar/' + idSolicitud,
      SolicitudPrestamo
    );
  }

  deleteSolicitud(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/eliminar/' + id);
  }
}
