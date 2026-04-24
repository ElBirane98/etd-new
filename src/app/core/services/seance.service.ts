import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, timeout, catchError, throwError } from 'rxjs';
import { Seance } from './seance';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSeances(): Observable<Seance[]> {
    return this.http.get<any>(`${this.apiUrl}/seances`).pipe(
      map(response => {
        const data = Array.isArray(response) ? response : (response.data || []);
        return data.map((s: any) => ({
          id: s.id,
          jour: s.horaire?.jour || 'Lundi',
          heure_debut: (s.horaire?.debut || '08:00').substring(0, 5),
          heure_fin: (s.horaire?.fin || '10:00').substring(0, 5),
          cours: s.matiere || 'Inconnu',
          cours_abr: s.code || (s.matiere ? s.matiere.substring(0, 4).toUpperCase() : 'INC'),
          enseignant: s.enseignant || 'Inconnu',
          enseignant_init: s.enseignant ? s.enseignant.split(' ').map((n: string) => n[0]).join('') : 'XX',
          salle: s.salle || 'Inconnue',
          classe: s.classe || 'Inconnu',
          type: (s.type || 'cours') as any
        }));
      })
    );
  }



  getSeanceById(id: number): Observable<Seance | undefined> {
    return this.http.get<{data: any}>(`${this.apiUrl}/seances/${id}`).pipe(
      map(response => {
        const s = response.data;
        return {
          id: s.id,
          jour: s.horaire?.jour || 'Lundi',
          heure_debut: s.horaire?.debut || '08:00',
          heure_fin: s.horaire?.fin || '10:00',
          cours: s.matiere || 'Inconnu',
          cours_abr: s.code || (s.matiere ? s.matiere.substring(0, 4).toUpperCase() : 'INC'),
          enseignant: s.enseignant || 'Inconnu',
          enseignant_init: s.enseignant ? s.enseignant.split(' ').map((n: string) => n[0]).join('') : 'XX',
          salle: s.salle || 'Inconnue',
          classe: s.classe || 'Inconnu',
          type: s.type || 'cours'
        };
      })
    );
  }


  creerSeance(seance: any): Observable<any> {
    const payload = {
        numero_debut_semaine: 1, 
        numero_fin_semaine: 15,
        annee: new Date().getFullYear(),
        type: seance.type,
        cour_id: seance.cour_id,
        professeur_id: seance.professeur_id,
        salle_id: seance.salle_id,
        creneau_horaire_id: seance.creneau_horaire_id
    };
    return this.http.post<{data: any}>(`${this.apiUrl}/seances`, payload).pipe(
      timeout(10000), // 10 secondes max
      map(response => response.data),
      catchError(err => {
        console.error('Service Error:', err);
        return throwError(() => err);
      })
    );
  }


  modifierSeance(id: number, seance: any): Observable<any> {
    const payload = {
        type: seance.type,
        cour_id: seance.cour_id,
        professeur_id: seance.professeur_id,
        salle_id: seance.salle_id,
        creneau_horaire_id: seance.creneau_horaire_id
    };
    return this.http.put<{data: any}>(`${this.apiUrl}/seances/${id}`, payload).pipe(
      map(response => response.data)
    );
  }

  supprimerSeance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/seances/${id}`);
  }

  getClasses(): Observable<string[]> {
    return this.http.get<{data: any[]}>(`${this.apiUrl}/niveaux`).pipe(
      map(response => response.data.map(n => n.nom))
    );
  }

  getCreneaux(): Observable<any[]> {
    return this.http.get<{data: any[]}>(`${this.apiUrl}/creneaux`).pipe(
      map(response => response.data)
    );
  }
}
