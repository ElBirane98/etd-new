import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DashboardStats {
  classes: number;
  salles: number;
  departements: number;
  professeurs: number;
  seances: {
    total: number;
    cette_semaine: number;
  };
  cours: number;
  filieres: {
    count: number;
    names: string[];
  };
  conflits: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/stats`).pipe(
      tap(raw => console.log('Raw Dashboard API Response:', raw)),
      map(response => {
        if (response.counts) return response.counts;
        if (response.data) return response.data;
        return response;
      })
    );
  }
}
