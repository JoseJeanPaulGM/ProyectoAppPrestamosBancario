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

  updateEmpleado(id: number, empleado: any) {
    return this.http.put(this.apiUrl + '/actualizar/empleado/' + id, empleado);
  }
}
