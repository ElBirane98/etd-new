import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Seance } from './seance';

const SEANCES_MOCK: Seance[] = [
  { id:1,  jour:'Lundi',    heure_debut:'08:00', heure_fin:'10:00', cours:'Mathématiques',         cours_abr:'MATH', enseignant:'Dr. Traoré',   enseignant_init:'TR', salle:'A101', classe:'M1-GDIL', type:'cours'  },
  { id:2,  jour:'Lundi',    heure_debut:'10:00', heure_fin:'12:00', cours:'Algorithmique',          cours_abr:'ALGO', enseignant:'Dr. Ndiaye',   enseignant_init:'ND', salle:'A102', classe:'M1-GDIL', type:'td'     },
  { id:3,  jour:'Lundi',    heure_debut:'14:00', heure_fin:'16:00', cours:'Bases de Données',       cours_abr:'BDD',  enseignant:'Pr. Sow',      enseignant_init:'SW', salle:'Labo1',classe:'M1-GDIL', type:'tp'     },
  { id:4,  jour:'Mardi',    heure_debut:'08:00', heure_fin:'10:00', cours:'Génie Logiciel',         cours_abr:'GL',   enseignant:'Dr. Diallo',   enseignant_init:'DL', salle:'B201', classe:'M1-GDIL', type:'cours'  },
  { id:5,  jour:'Mardi',    heure_debut:'10:00', heure_fin:'12:00', cours:'Réseaux',                cours_abr:'RES',  enseignant:'Pr. Fall',     enseignant_init:'FL', salle:'A103', classe:'M1-GDIL', type:'cours'  },
  { id:6,  jour:'Mardi',    heure_debut:'14:00', heure_fin:'16:00', cours:'Algorithmique',          cours_abr:'ALGO', enseignant:'Dr. Ndiaye',   enseignant_init:'ND', salle:'Labo2',classe:'M1-GDIL', type:'tp'     },
  { id:7,  jour:'Mercredi', heure_debut:'08:00', heure_fin:'10:00', cours:'Angular & Frameworks',   cours_abr:'ANG',  enseignant:'Dr. Daiif',    enseignant_init:'DF', salle:'Labo1',classe:'M1-GDIL', type:'tp'     },
  { id:8,  jour:'Mercredi', heure_debut:'10:00', heure_fin:'12:00', cours:'Bases de Données',       cours_abr:'BDD',  enseignant:'Pr. Sow',      enseignant_init:'SW', salle:'A101', classe:'M1-GDIL', type:'td'     },
  { id:9,  jour:'Mercredi', heure_debut:'14:00', heure_fin:'16:00', cours:'Intelligence Artificielle',cours_abr:'IA', enseignant:'Dr. Camara',   enseignant_init:'CA', salle:'Amph', classe:'M1-GDIL', type:'cours'  },
  { id:10, jour:'Jeudi',    heure_debut:'08:00', heure_fin:'10:00', cours:'Mathématiques',          cours_abr:'MATH', enseignant:'Dr. Traoré',   enseignant_init:'TR', salle:'B202', classe:'M1-GDIL', type:'td'     },
  { id:11, jour:'Jeudi',    heure_debut:'10:00', heure_fin:'12:00', cours:'Réseaux',                cours_abr:'RES',  enseignant:'Pr. Fall',     enseignant_init:'FL', salle:'Labo2',classe:'M1-GDIL', type:'tp'     },
  { id:12, jour:'Jeudi',    heure_debut:'14:00', heure_fin:'16:00', cours:'Génie Logiciel',         cours_abr:'GL',   enseignant:'Dr. Diallo',   enseignant_init:'DL', salle:'A102', classe:'M1-GDIL', type:'td'     },
  { id:13, jour:'Vendredi', heure_debut:'08:00', heure_fin:'10:00', cours:'Angular & Frameworks',   cours_abr:'ANG',  enseignant:'Dr. Daiif',    enseignant_init:'DF', salle:'A103', classe:'M1-GDIL', type:'cours'  },
  { id:14, jour:'Vendredi', heure_debut:'10:00', heure_fin:'12:00', cours:'Intelligence Artificielle',cours_abr:'IA', enseignant:'Dr. Camara',   enseignant_init:'CA', salle:'A101', classe:'M1-GDIL', type:'td'     },
  { id:15, jour:'Vendredi', heure_debut:'14:00', heure_fin:'16:00', cours:'Examen BDD',             cours_abr:'EX-BDD',enseignant:'Pr. Sow',    enseignant_init:'SW', salle:'Amph', classe:'M1-GDIL', type:'examen' },
  { id:16, jour:'Lundi',    heure_debut:'16:00', heure_fin:'18:00', cours:'Génie Logiciel',         cours_abr:'GL',   enseignant:'Dr. Diallo',   enseignant_init:'DL', salle:'B201', classe:'L3-INFO', type:'cours'  },
  { id:17, jour:'Mardi',    heure_debut:'16:00', heure_fin:'18:00', cours:'Mathématiques',          cours_abr:'MATH', enseignant:'Dr. Traoré',   enseignant_init:'TR', salle:'A102', classe:'L3-INFO', type:'cours'  },
  { id:18, jour:'Mercredi', heure_debut:'16:00', heure_fin:'18:00', cours:'Réseaux',                cours_abr:'RES',  enseignant:'Pr. Fall',     enseignant_init:'FL', salle:'Labo1',classe:'L3-INFO', type:'tp'     },
];

@Injectable({ providedIn: 'root' })
export class SeanceService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getSeances(): Observable<Seance[]> {
    // return this.http.get<Seance[]>(`${this.apiUrl}/seances`);
    return of(SEANCES_MOCK);
  }

  getSeanceById(id: number): Observable<Seance | undefined> {
    return of(SEANCES_MOCK.find(s => s.id === id));
  }

  creerSeance(seance: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/seances`, seance);
  }

  modifierSeance(id: number, seance: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/seances/${id}`, seance);
  }

  supprimerSeance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/seances/${id}`);
  }

  getClasses(): string[] {
    return ['M1-GDIL', 'L3-INFO', 'M2-GDIL', 'L2-INFO'];
  }
}
