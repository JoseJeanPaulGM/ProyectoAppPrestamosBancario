import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8095/api/v1/usuario';

  constructor(private http: HttpClient) {}

  getEmpleados() {
    return this.http.get(this.apiUrl + '/empleados');
  }

  getEmpleado(id: number) {
    return this.http.get(this.apiUrl + '/empleados/' + id);
  }

  createEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar/empleado', empleado);
  }

  updateEmpleado(empleado: any) {
    return this.http.put(this.apiUrl + '/actualizar', empleado);
  }
  deleteEmpleado(id: number) {
    return this.http.delete(this.apiUrl + '/eliminar/' + id);
  }

  //Obtener Prestamistas por Id de Jefe Prestamista
  getPrestamistasByJefePrestamista(id: number) {
    return this.http.get(this.apiUrl + '/prestamistas/' + id);
  }

  getUsuarioPorPefil(idPerfil: number) {
    return this.http.get(this.apiUrl + '/perfil/' + idPerfil);
  }
}
