import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private apiUrl = 'http://localhost:9088/api/v1';
    
    constructor(private http: HttpClient) {}
    
    getGrupos(): Observable<any> {
        return this.http.get(this.apiUrl + '/grupos');
    }
    
    getGrupo(id: number): Observable<any> {
        return this.http.get(this.apiUrl + '/grupos/' + id);
    }
    
    createGrupo(grupo: any): Observable<any> {
        return this.http.post(this.apiUrl + '/grupos', grupo);
    }
    
    updateGrupo(id: number, grupo: any): Observable<any> {
        return this.http.put(this.apiUrl + '/grupos/' + id, grupo);
    }
    
    deleteGrupo(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + '/grupos/' + id);
    }
}
