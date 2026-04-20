import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeanceService } from '../../../core/services/seance.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { CoursService } from '../../../core/services/cours.service';
import { SalleService } from '../../../core/services/salle.service';
import { Seance } from '../../../core/services/seance';

@Component({
  selector: 'app-grille-edt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grille-emploi-du-temps.html',
  styleUrl: './grille-emploi-du-temps.css'
})
export class GrilleEdtComponent implements OnInit {
  jours    = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi'];
  creneaux = [
    { debut:'08:00', fin:'10:00' },
    { debut:'10:00', fin:'12:00' },
    { debut:'14:00', fin:'16:00' },
    { debut:'16:00', fin:'18:00' },
  ];

  seances    : Seance[] = [];
  enseignants: any[]    = [];
  cours      : any[]    = [];
  salles     : any[]    = [];
  classes    : string[] = [];

  filtreClasse     = 'M1-GDIL';
  filtreEnseignant = '';
  filtreCours      = '';

  seanceSelectionnee: Seance | null = null;

  constructor(
    private seanceService    : SeanceService,
    private enseignantService: EnseignantService,
    private coursService     : CoursService,
    private salleService     : SalleService
  ) {}

  ngOnInit() {
    this.seanceService.getSeances().subscribe(d     => this.seances     = d);
    this.enseignantService.getEnseignants().subscribe(d => this.enseignants = d);
    this.coursService.getCours().subscribe(d         => this.cours       = d);
    this.salleService.getSalles().subscribe(d         => this.salles      = d);
    this.classes = this.seanceService.getClasses();
  }

  getSeancesPour(jour: string, heure: string): Seance[] {
    return this.seances.filter(s =>
      s.jour === jour &&
      s.heure_debut === heure &&
      (!this.filtreClasse     || s.classe === this.filtreClasse) &&
      (!this.filtreEnseignant || s.enseignant.includes(this.filtreEnseignant)) &&
      (!this.filtreCours      || s.cours.includes(this.filtreCours))
    );
  }

  cssSeance(type: string): string {
    return { cours:'cours-type', td:'td-type', tp:'tp-type', examen:'examen-type' }[type] || '';
  }

  selectionner(s: Seance) { this.seanceSelectionnee = s; }
  fermer()                 { this.seanceSelectionnee = null; }

  reinitialiser() {
    this.filtreClasse = 'M1-GDIL';
    this.filtreEnseignant = '';
    this.filtreCours = '';
  }
}
