import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamistaService {

  private apiUrl = 'http://localhost:9088/api/v1';
    
    constructor(private http: HttpClient) {}
    
    getPrestamistas(): Observable<any> {
        return this.http.get(this.apiUrl + '/prestamistas');
    }
    
    getPrestamista(id: number): Observable<any> {
        return this.http.get(this.apiUrl + '/prestamistas/' + id);
    }
    
    createPrestamista(prestamista: any): Observable<any> {
        return this.http.post(this.apiUrl + '/prestamistas', prestamista);
    }
    
    updatePrestamista(id: number, prestamista: any): Observable<any> {
        return this.http.put(this.apiUrl + '/prestamistas/' + id, prestamista);
    }
    
    deletePrestamista(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + '/prestamistas/' + id);
    }
}
