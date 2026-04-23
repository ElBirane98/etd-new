import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursService } from '../../../core/services/cours.service';
import { Cours } from '../../../core/services/cours';
import { ExportService } from '../../../core/services/export.service';

@Component({
  selector: 'app-liste-cours',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-cours.html',
  styleUrl: './liste-cours.css'
})
export class ListeCoursComponent implements OnInit {
  cours: Cours[] = [];
  filtre = '';
  filtreFiliere = '';
  confirmation: number | null = null;
  afficherFormulaire = false;
  modeEdition = false;
  coursForm: Partial<Cours> = this.initialiserCours();

  filieres: string[] = [];

  constructor(
    private service: CoursService,
    private exportService: ExportService,
    private cdr: ChangeDetectorRef
  ) {}

  exporter() {
    const headers = ['ID', 'Code', 'Intitulé', 'Filière', 'Semestre', 'Crédits', 'Volume Horaire'];
    this.exportService.exportToCsv('liste_cours', this.cours, headers);
  }

  private initialiserCours(): Partial<Cours> {
    return {
      code: '',
      intitule: '',
      credits: 0,
      filiere: '',
      semestre: 1,
      type_seances: ['cours'],
      volume_horaire: 0
    };
  }

  ngOnInit() {
    this.chargerCours();
  }

  chargerCours() {
    this.service.getCours().subscribe(d => {
      this.cours = d;
      this.filieres = [...new Set(d.map(c => c.filiere))];
      this.cdr.detectChanges();
    });
  }

  get filtres(): Cours[] {
    const q = this.filtre.toLowerCase();
    return this.cours.filter(c =>
      (c.intitule.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) &&
      (!this.filtreFiliere || c.filiere === this.filtreFiliere)
    );
  }

  ouvrirAjout() {
    this.modeEdition = false;
    this.coursForm = this.initialiserCours();
    this.afficherFormulaire = true;
  }

  ouvrirEdition(c: Cours) {
    this.modeEdition = true;
    this.coursForm = { ...c };
    this.afficherFormulaire = true;
  }

  validerFormulaire() {
    if (this.modeEdition && this.coursForm.id) {
      this.service.modifierCours(this.coursForm.id, this.coursForm as Cours).subscribe(() => {
        this.chargerCours();
        this.afficherFormulaire = false;
      });
    } else {
      this.service.creerCours(this.coursForm as Cours).subscribe(() => {
        this.chargerCours();
        this.afficherFormulaire = false;
      });
    }
  }

  supprimer(id: number) {
    this.service.supprimerCours(id).subscribe(() => {
      this.chargerCours();
      this.confirmation = null;
    });
  }

  badgeType(type: string): string {
    return { cours:'cours', td:'td', tp:'tp', examen:'examen' }[type] || 'cours';
  }
}
