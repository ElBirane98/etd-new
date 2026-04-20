import { Component, OnInit } from '@angular/core';
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
  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  heures = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  creneaux = [
    { debut: '08:00', fin: '10:00' },
    { debut: '10:00', fin: '12:00' },
    { debut: '14:00', fin: '16:00' },
    { debut: '16:00', fin: '18:00' },
  ];

  seances: Seance[] = [];
  enseignants: any[] = [];
  cours: any[] = [];
  salles: any[] = [];
  classes: string[] = [];

  filtreClasse = 'M1-GDIL';
  filtreEnseignant = '';
  filtreSalle = '';
  filtreCours = '';

  seanceSelectionnee: Seance | null = null;

  constructor(
    private seanceService: SeanceService,
    private enseignantService: EnseignantService,
    private coursService: CoursService,
    private salleService: SalleService
  ) { }

  ngOnInit() {
    this.seanceService.getSeances().subscribe(d => this.seances = d);
    this.enseignantService.getEnseignants().subscribe(d => this.enseignants = d);
    this.coursService.getCours().subscribe(d => this.cours = d);
    this.salleService.getSalles().subscribe(d => this.salles = d);
    this.classes = this.seanceService.getClasses();
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
    this.filtreClasse = 'M1-GDIL';
    this.filtreEnseignant = '';
    this.filtreSalle = '';
  }
}
