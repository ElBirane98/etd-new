import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Salle } from './salle';

const SALLES_MOCK: Salle[] = [
  { id:1,  nom:'A101',  capacite:40,  type:'salle_cours',   batiment:'Bâtiment A', disponible:true  },
  { id:2,  nom:'A102',  capacite:40,  type:'salle_cours',   batiment:'Bâtiment A', disponible:true  },
  { id:3,  nom:'A103',  capacite:35,  type:'salle_cours',   batiment:'Bâtiment A', disponible:true  },
  { id:4,  nom:'B201',  capacite:50,  type:'salle_cours',   batiment:'Bâtiment B', disponible:true  },
  { id:5,  nom:'B202',  capacite:50,  type:'salle_cours',   batiment:'Bâtiment B', disponible:false },
  { id:6,  nom:'Labo1', capacite:25,  type:'labo_info',     batiment:'Bâtiment C', disponible:true  },
  { id:7,  nom:'Labo2', capacite:25,  type:'labo_info',     batiment:'Bâtiment C', disponible:true  },
  { id:8,  nom:'TP-Elec',capacite:20, type:'labo_tp',       batiment:'Bâtiment D', disponible:true  },
  { id:9,  nom:'Amph',  capacite:200, type:'amphitheatre',  batiment:'Bâtiment Principal', disponible:true  },
  { id:10, nom:'Amph2', capacite:150, type:'amphitheatre',  batiment:'Bâtiment Principal', disponible:false },
];

@Injectable({ providedIn: 'root' })
export class SalleService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getSalles(): Observable<Salle[]> {
    // return this.http.get<Salle[]>(`${this.apiUrl}/salles`);
    return of(SALLES_MOCK);
  }

  creerSalle(s: Salle): Observable<Salle> {
    return this.http.post<Salle>(`${this.apiUrl}/salles`, s);
  }

  modifierSalle(id: number, s: Salle): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/salles/${id}`, s);
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
