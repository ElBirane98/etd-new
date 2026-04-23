import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Enseignant } from './enseignant';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnseignantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEnseignants(): Observable<Enseignant[]> {
    return this.http.get<{data: any[]}>(`${this.apiUrl}/professeurs`).pipe(
      map(response => response.data.map(e => ({
        id: e.id,
        nom: e.nom,
        prenom: e.prenom,
        email: e.email,
        specialite: e.specialite,
        departement: e.departement,
        departement_id: e.departement_id,
        grade: e.grade,
        actif: e.status === 'actif'
      })))
    );
  }

  creerEnseignant(e: Enseignant): Observable<Enseignant> {
    const payload = {
      ...e,
      status: e.actif ? 'actif' : 'inactif',
      telephone: '000000000',
      numero_immatriculation: `MAT-${Date.now()}`
    };
    return this.http.post<{data: any}>(`${this.apiUrl}/professeurs`, payload).pipe(
      map(response => ({
        ...response.data,
        departement: response.data.departement || 'Département Inconnu',
        departement_id: response.data.departement_id,
        grade: response.data.grade || 'Enseignant',
        actif: response.data.status === 'actif'
      }))
    );
  }

  modifierEnseignant(id: number, e: Enseignant): Observable<Enseignant> {
    const payload = {
      ...e,
      status: e.actif ? 'actif' : 'inactif'
    };
    return this.http.put<{data: any}>(`${this.apiUrl}/professeurs/${id}`, payload).pipe(
      map(response => ({
        ...response.data,
        departement: response.data.departement || 'Département Inconnu',
        departement_id: response.data.departement_id,
        grade: response.data.grade || 'Enseignant',
        actif: response.data.status === 'actif'
      }))
    );
  }

  supprimerEnseignant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/professeurs/${id}`);
  }
}
