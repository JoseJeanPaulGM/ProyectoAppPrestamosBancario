import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private listaOpciones = new BehaviorSubject<any[]>([]);

  private apiUrl = 'http://localhost:8095/api/v1/usuario';

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<any> {
    return this.http.post(this.apiUrl + '/login', credentials);
  }

  obtenerUsuarioPorId(idUsuario: number): Observable<any> {
    return this.http.get(this.apiUrl + '/obtener/' + idUsuario);
  }

  cargarMenus() {}

  getAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated.next(value);
  }

  setMenus(value: any[]) {
    this.listaOpciones.next(value);
  }

  getMenus(): Observable<any[]> {
    return this.listaOpciones.asObservable();
  }

  logout() {
    this.isAuthenticated.next(false);
    this.listaOpciones.next([]);
    localStorage.removeItem('login');
  }
}
