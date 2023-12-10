import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8095/api/v1/usuario';

  constructor(private http: HttpClient) {}

  getClientes() {
    return this.http.get(this.apiUrl + '/clientes');
  }

  getCliente(id: number) {
    return this.http.get(this.apiUrl + '/clientes/' + id);
  }

  createCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar/cliente', cliente);
  }

  updateCliente(cliente: any) {
    return this.http.put(this.apiUrl + '/actualizar', cliente);
  }
  deleteCliente(id: number) {
    return this.http.delete(this.apiUrl + '/eliminar/' + id);
  }

  getClientesByJefePrestamista(id: number) {
    return this.http.get(this.apiUrl + '/clientes/jefe-prestamista/' + id);
  }
}
