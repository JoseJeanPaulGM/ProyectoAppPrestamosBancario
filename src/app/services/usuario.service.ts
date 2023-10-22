import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:9088/api/v1';
    
    constructor(private http: HttpClient) {}
    
    getUsuarios(): Observable<any> {
        return this.http.get(this.apiUrl + '/usuarios');
    }
    
    getUsuario(id: number): Observable<any> {
        return this.http.get(this.apiUrl + '/usuarios/' + id);
    }
    
    createUsuario(usuario: any): Observable<any> {
        return this.http.post(this.apiUrl + '/usuarios', usuario);
    }
    
    updateUsuario(id: number, usuario: any): Observable<any> {
        return this.http.put(this.apiUrl + '/usuarios/' + id, usuario);
    }
    
    deleteUsuario(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + '/usuarios/' + id);
    }
}
