import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8095/api/v1';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl + '/usuarios');
  }

  getUsuario(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/usuarios/' + id);
  }

  listarJefesPrestamistas(): Observable<any> {
    return this.http.get(this.apiUrl + '/usuario/listar/jefes');
  }

  listarPrestamistas(): Observable<any> {
    return this.http.get(this.apiUrl + '/usuario/listar/prestamistas');
  }

  listarPrestamistasPorJefe(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/usuario/listar/prestamistas/' + id);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl + '/usuario', usuario);
  }

  updateUsuario(usuario: any): Observable<any> {
    return this.http.put(this.apiUrl + '/usuario/', usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/usuarios/' + id);
  }
}
