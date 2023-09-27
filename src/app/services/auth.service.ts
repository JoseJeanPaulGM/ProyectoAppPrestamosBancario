import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  private apiUrl = 'http://localhost:9088/api/v1';

  constructor(private http: HttpClient) {}

  login(credentials: Auth): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', credentials);
  }

  getAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  logout() {
    // Lógica para cerrar sesión
    this.isAuthenticated = false;
  }
}
