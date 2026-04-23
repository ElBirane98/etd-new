import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Filiere } from './filiere';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FiliereService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFilieres(): Observable<Filiere[]> {
    return this.http.get<{data: Filiere[]}>(`${this.apiUrl}/filieres`).pipe(
      map(response => response.data)
    );
  }

  creerFiliere(f: Filiere): Observable<Filiere> {
    return this.http.post<{data: Filiere}>(`${this.apiUrl}/filieres`, f).pipe(
      map(response => response.data)
    );
  }

  modifierFiliere(id: number, f: Filiere): Observable<Filiere> {
    return this.http.put<{data: Filiere}>(`${this.apiUrl}/filieres/${id}`, f).pipe(
      map(response => response.data)
    );
  }

  supprimerFiliere(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/filieres/${id}`);
  }
}
