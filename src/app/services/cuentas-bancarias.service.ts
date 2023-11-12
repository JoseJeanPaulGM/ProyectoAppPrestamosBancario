import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentasBancariasService {

  private apiUrl = 'http://localhost:9088/api/v1/cuentas-bancarias';

  constructor(private http: HttpClient) {}

  getCuentasBancarias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCuentaBancaria(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  createCuentaBancaria(cuentaBancaria: any): Observable<any> {
    return this.http.post(this.apiUrl, cuentaBancaria);
  }

  updateCuentaBancaria(id: number, cuentaBancaria: any): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, cuentaBancaria);
  }
}