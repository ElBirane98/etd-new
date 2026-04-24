import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Creneau } from './creneau';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CreneauService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCreneaux(): Observable<Creneau[]> {
    return this.http.get<{data: Creneau[]}>(`${this.apiUrl}/creneaux`).pipe(
      map(response => response.data)
    );
  }

  creerCreneau(c: Creneau): Observable<Creneau> {
    return this.http.post<{data: Creneau}>(`${this.apiUrl}/creneaux`, c).pipe(
      map(response => response.data)
    );
  }

  modifierCreneau(id: number, c: Creneau): Observable<Creneau> {
    return this.http.put<{data: Creneau}>(`${this.apiUrl}/creneaux/${id}`, c).pipe(
      map(response => response.data)
    );
  }

  supprimerCreneau(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/creneaux/${id}`);
  }
}
