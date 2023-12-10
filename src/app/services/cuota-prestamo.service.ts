import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuotaPrestamoService {
  private apiUrl = 'http://localhost:8095/api/v1/cuota';

  constructor(private http: HttpClient) {}

  getCuotas(): Observable<any> {
    return this.http.get(this.apiUrl + '/listar');
  }

  getCuota(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  actualizarCuota(id: number, cuota: any): Observable<any> {
    return this.http.put(this.apiUrl + '/actualizar/' + id, cuota);
  }
}
