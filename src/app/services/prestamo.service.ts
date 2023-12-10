import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private apiUrl = 'http://localhost:8095/api/v1/prestamo';

  constructor(private http: HttpClient) {}

  getPrestamos(): Observable<any> {
    return this.http.get(this.apiUrl + '/listar');
  }

  getPrestamo(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  getPrestamosByEstado(estado: string): Observable<any> {
    return this.http.get(this.apiUrl + '/estado/' + estado);
  }

  getPrestamosByPrestamista(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/prestamista/' + id);
  }

  getPrestamosByPrestatario(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/prestatario/' + id);
  }

  getPrestamosByJefePrestamista(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/jefePrestamista/' + id);
  }

  validarPrestamo(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/validar/' + id);
  }
}
