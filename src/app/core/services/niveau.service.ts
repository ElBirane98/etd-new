import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Niveau } from './niveau';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NiveauService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNiveaux(): Observable<Niveau[]> {
    return this.http.get<{data: any[]}>(`${this.apiUrl}/niveaux`).pipe(
      map(response => response.data.map(n => ({
        id: n.id,
        nom: n.nom,
        niveau: n.niveau,
        departement: n.departement,
        departement_id: n.departement_id
      })))

    );
  }

  creerNiveau(n: Niveau): Observable<Niveau> {
    return this.http.post<{data: any}>(`${this.apiUrl}/niveaux`, n).pipe(
      map(response => response.data)
    );
  }

  modifierNiveau(id: number, n: Niveau): Observable<Niveau> {
    return this.http.put<{data: any}>(`${this.apiUrl}/niveaux/${id}`, n).pipe(
      map(response => response.data)
    );
  }

  supprimerNiveau(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/niveaux/${id}`);
  }
}
