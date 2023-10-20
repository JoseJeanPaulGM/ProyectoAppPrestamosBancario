import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticated: boolean = false;
  private isAdministrador: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isCliente: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private isPrestamista: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:9088/api/v1';

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', credentials);
  }

  getAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  getIsAdministrador(): Observable<boolean> {
    return this.isAdministrador.asObservable();
  }

  setIsAdministrador(value: boolean) {
    this.isAdministrador.next(value);
  }

  getIsCliente(): Observable<boolean> {
    return this.isCliente.asObservable();
  }

  setIsCliente(value: boolean) {
    this.isCliente.next(value);
  }

  getIsPrestamista(): Observable<boolean> {
    return this.isPrestamista.asObservable();
  }

  setIsPrestamista(value: boolean) {
    this.isPrestamista.next(value);
  }

  logout() {
    // Lógica para cerrar sesión
    this.isAuthenticated = false;
  }
}
