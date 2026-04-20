import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cours } from './cours';

const COURS_MOCK: Cours[] = [
  { id:1, code:'INF501', intitule:'Mathématiques',           credits:4, filiere:'M1-GDIL', semestre:1, type_seances:['cours','td'],      volume_horaire:45 },
  { id:2, code:'INF502', intitule:'Algorithmique',           credits:5, filiere:'M1-GDIL', semestre:1, type_seances:['cours','td','tp'], volume_horaire:60 },
  { id:3, code:'INF503', intitule:'Bases de Données',        credits:5, filiere:'M1-GDIL', semestre:1, type_seances:['cours','td','tp'], volume_horaire:60 },
  { id:4, code:'INF504', intitule:'Génie Logiciel',          credits:4, filiere:'M1-GDIL', semestre:1, type_seances:['cours','td'],      volume_horaire:45 },
  { id:5, code:'INF505', intitule:'Réseaux',                 credits:4, filiere:'M1-GDIL', semestre:2, type_seances:['cours','tp'],      volume_horaire:45 },
  { id:6, code:'INF506', intitule:'Angular & Frameworks',    credits:3, filiere:'M1-GDIL', semestre:2, type_seances:['cours','tp'],      volume_horaire:45 },
  { id:7, code:'INF507', intitule:'Intelligence Artificielle',credits:5,filiere:'M1-GDIL', semestre:2, type_seances:['cours','td'],      volume_horaire:60 },
  { id:8, code:'INF401', intitule:'Programmation Orientée Objet',credits:4,filiere:'L3-INFO',semestre:1,type_seances:['cours','tp'],     volume_horaire:45 },
  { id:9, code:'INF402', intitule:'Sécurité Informatique',   credits:3, filiere:'L3-INFO', semestre:2, type_seances:['cours'],           volume_horaire:30 },
];

@Injectable({ providedIn: 'root' })
export class CoursService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getCours(): Observable<Cours[]> {
    // return this.http.get<Cours[]>(`${this.apiUrl}/cours`);
    return of(COURS_MOCK);
  }

  creerCours(c: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${this.apiUrl}/cours`, c);
  }

  modifierCours(id: number, c: Cours): Observable<Cours> {
    return this.http.put<Cours>(`${this.apiUrl}/cours/${id}`, c);
  }

  supprimerCours(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cours/${id}`);
  }
}
