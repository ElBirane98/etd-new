import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cours } from './cours';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CoursService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCours(): Observable<Cours[]> {
    return this.http.get<{data: any[]}>(`${this.apiUrl}/cours`).pipe(
      map(response => response.data.map(c => ({
        id: c.id,
        code: c.code,
        intitule: c.nom,
        credits: c.credits,
        filiere: c.filiere,
        semestre: c.semestre,
        type_seances: ['cours', 'td'], // Still static for now as it's not in the DB
        volume_horaire: c.volume_horaire
      })))
    );
  }

  creerCours(c: Cours): Observable<Cours> {
    const payload = {
      nom: c.intitule,
      code: c.code,
      description: 'Description de ' + c.intitule,
      credits: c.credits,
      semestre: c.semestre,
      volume_horaire: c.volume_horaire,
      filiere_id: 1, // Default to first filière for now
      niveau_id: 1,
      professeur_id: 1
    };
    return this.http.post<{data: any}>(`${this.apiUrl}/cours`, payload).pipe(
      map(response => ({
        ...c,
        id: response.data.id,
        filiere: response.data.filiere || c.filiere
      }))
    );
  }

  modifierCours(id: number, c: Cours): Observable<Cours> {
    const payload = {
      nom: c.intitule,
      code: c.code,
      credits: c.credits,
      semestre: c.semestre,
      volume_horaire: c.volume_horaire
    };
    return this.http.put<{data: any}>(`${this.apiUrl}/cours/${id}`, payload).pipe(
      map(response => ({
        ...c,
        filiere: response.data.filiere || c.filiere
      }))
    );
  }

  supprimerCours(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cours/${id}`);
  }
}
