import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeanceService } from '../../../core/services/seance.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { CoursService } from '../../../core/services/cours.service';
import { SalleService } from '../../../core/services/salle.service';
import { Seance } from '../../../core/services/seance';

@Component({
  selector: 'app-grille-edt-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './grille-edt-admin.html',
  styleUrl: './grille-edt-admin.css'
})
export class GrilleEdtAdminComponent implements OnInit {
  jours: string[] = [];
  creneaux: any[] = [];

  seances: Seance[] = [];
  enseignants: any[] = [];
  cours: any[] = [];
  salles: any[] = [];
  classes: string[] = [];

  filtreClasse = '';
  filtreEnseignant = '';
  filtreSalle = '';
  filtreCours = '';

  seanceSelectionnee: Seance | null = null;

  constructor(
    private seanceService: SeanceService,
    private enseignantService: EnseignantService,
    private coursService: CoursService,
    private salleService: SalleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.seanceService.getSeances().subscribe(d => { this.seances = d; this.cdr.detectChanges(); });
    this.enseignantService.getEnseignants().subscribe(d => { this.enseignants = d; this.cdr.detectChanges(); });
    this.coursService.getCours().subscribe(d => { this.cours = d; this.cdr.detectChanges(); });
    this.salleService.getSalles().subscribe(d => { this.salles = d; this.cdr.detectChanges(); });
    
    this.seanceService.getClasses().subscribe(d => {
      this.classes = d;
      this.cdr.detectChanges();
    });

    this.seanceService.getCreneaux().subscribe(d => {
      // On extrait les jours uniques
      this.jours = [...new Set(d.map(c => c.jour))];
      // On garde les créneaux uniques (par début/fin) pour l'affichage des lignes
      const uniqueCreneaux = [];
      const map = new Map();
      for (const item of d) {
          const debut = item.debut.substring(0, 5);
          const fin = item.fin.substring(0, 5);
          const key = `${debut}-${fin}`;
          if(!map.has(key)){
              map.set(key, true);
              uniqueCreneaux.push({
                  debut: debut,
                  fin: fin
              });
          }
      }
      this.creneaux = uniqueCreneaux.sort((a,b) => a.debut.localeCompare(b.debut));
      this.cdr.detectChanges();
    });
  }

  getSeancesPour(jour: string, heure: string): Seance[] {
    return this.seances.filter(s =>
      s.jour === jour &&
      s.heure_debut === heure &&
      (!this.filtreClasse || s.classe === this.filtreClasse) &&
      (!this.filtreEnseignant || s.enseignant.includes(this.filtreEnseignant)) &&
      (!this.filtreSalle || s.salle === this.filtreSalle)
    );
  }

  cssSeance(type: string): string {
    return { cours: 'cours-type', td: 'td-type', tp: 'tp-type', examen: 'examen-type' }[type] || '';
  }

  selectionner(s: Seance) { this.seanceSelectionnee = s; }
  fermerDetail() { this.seanceSelectionnee = null; }

  reinitialiserFiltres() {
    this.filtreClasse = this.classes.length > 0 ? this.classes[0] : '';
    this.filtreEnseignant = '';
    this.filtreSalle = '';
  }

  exporterPDF() {
    window.print();
  }
}
