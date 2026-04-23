import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Salle } from './salle';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SalleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSalles(): Observable<Salle[]> {
    return this.http.get<{data: any[]}>(`${this.apiUrl}/salles`).pipe(
      map(response => response.data.map(s => ({
        id: s.id,
        nom: s.nom,
        capacite: s.capacite,
        type: s.type,
        batiment: s.batiment,
        disponible: s.disponible
      })))
    );
  }

  creerSalle(s: Salle): Observable<Salle> {
    const payload = {
      ...s,
      est_disponible: s.disponible !== undefined ? s.disponible : true
    };
    return this.http.post<{data: any}>(`${this.apiUrl}/salles`, payload).pipe(
      map(response => ({
        id: response.data.id,
        nom: response.data.nom,
        capacite: response.data.capacite,
        type: response.data.type,
        batiment: response.data.batiment,
        disponible: response.data.disponible
      }))
    );
  }

  modifierSalle(id: number, s: Salle): Observable<Salle> {
    const payload = {
      ...s,
      est_disponible: s.disponible !== undefined ? s.disponible : true
    };
    return this.http.put<{data: any}>(`${this.apiUrl}/salles/${id}`, payload).pipe(
      map(response => ({
        id: response.data.id,
        nom: response.data.nom,
        capacite: response.data.capacite,
        type: response.data.type,
        batiment: response.data.batiment,
        disponible: response.data.disponible
      }))
    );
  }

  supprimerSalle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/salles/${id}`);
  }

  getTypeLabel(type: string): string {
    const labels: Record<string,string> = {
      amphitheatre: 'Amphithéâtre',
      salle_cours:  'Salle de cours',
      labo_info:    'Laboratoire Info',
      labo_tp:      'Laboratoire TP'
    };
    return labels[type] || type;
  }
}
