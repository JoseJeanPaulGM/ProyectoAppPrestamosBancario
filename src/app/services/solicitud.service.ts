import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'http://localhost:8095/api/v1/solicitud';

  constructor(private http: HttpClient) {}

  getSolicitudes() {
    return this.http.get(this.apiUrl + '/solicitudes');
  }

  getSolicitud(id: number) {
    return this.http.get(this.apiUrl + '/solicitudes/' + id);
  }

  createSolicitud(solicitud: any): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar', solicitud);
  }

  updateSolicitud(solicitud: any) {
    return this.http.put(this.apiUrl + '/actualizar', solicitud);
  }

  deleteSolicitud(id: number) {
    return this.http.delete(this.apiUrl + '/eliminar/' + id);
  }
}