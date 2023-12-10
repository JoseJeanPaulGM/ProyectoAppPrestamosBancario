import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentasBancariasService {

  private apiUrl = 'http://localhost:8095/api/v1/solicitud';


  constructor(private http: HttpClient) {}

  getCuentasBancarias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCuentaBancaria(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/listarCuenta/' + id);
  }

  createCuentaBancaria(cuentaBancaria: any): Observable<any> {
    return this.http.post(this.apiUrl + '/registrarCuenta', cuentaBancaria);
  }

  updateCuentaBancaria(id: number, cuentaBancaria: any): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, cuentaBancaria);
  }

}

