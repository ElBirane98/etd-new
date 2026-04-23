import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Departement } from './departement';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DepartementService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDepartements(): Observable<Departement[]> {
    return this.http.get<{data: Departement[]}>(`${this.apiUrl}/departements`).pipe(
      map(response => response.data)
    );
  }

  creerDepartement(d: Departement): Observable<Departement> {
    return this.http.post<{data: Departement}>(`${this.apiUrl}/departements`, d).pipe(
      map(response => response.data)
    );
  }

  modifierDepartement(id: number, d: Departement): Observable<Departement> {
    return this.http.put<{data: Departement}>(`${this.apiUrl}/departements/${id}`, d).pipe(
      map(response => response.data)
    );
  }

  supprimerDepartement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/departements/${id}`);
  }
}
