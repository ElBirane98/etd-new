import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalleService } from '../../../core/services/salle.service';
import { Salle } from '../../../core/services/salle';
import { ExportService } from '../../../core/services/export.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-liste-salles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-salles.html',
  styleUrl: './liste-salles.css'
})
export class ListeSallesComponent implements OnInit {
  salles: Salle[] = [];
  filtre = '';
  filtreType = '';
  confirmation: number | null = null;
  afficherFormulaire = false;
  modeEdition = false;
  salleForm: Partial<Salle> = this.initialiserSalle();

  types = [
    { valeur:'amphitheatre', label:'Amphithéâtre'     },
    { valeur:'salle_cours',  label:'Salle de cours'   },
    { valeur:'labo_info',    label:'Laboratoire Info'  },
    { valeur:'labo_tp',      label:'Laboratoire TP'    },
  ];

  constructor(
    private service: SalleService,
    private exportService: ExportService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  exporter() {
    const headers = ['ID', 'Nom', 'Bâtiment', 'Capacité', 'Type'];
    this.exportService.exportToCsv('liste_salles', this.salles, headers);
  }

  private initialiserSalle(): Partial<Salle> {
    return {
      nom: '',
      batiment: '',
      capacite: 30,
      type: 'salle_cours'
    };
  }

  ngOnInit() {
    this.chargerSalles();
  }

  chargerSalles() {
    this.service.getSalles().subscribe(d => {
      this.salles = d;
      this.cdr.detectChanges();
    });
  }

  get filtrees(): Salle[] {
    const q = this.filtre.toLowerCase();
    return this.salles.filter(s =>
      (s.nom.toLowerCase().includes(q) || s.batiment.toLowerCase().includes(q)) &&
      (!this.filtreType || s.type === this.filtreType)
    );
  }

  ouvrirAjout() {
    this.modeEdition = false;
    this.salleForm = this.initialiserSalle();
    this.afficherFormulaire = true;
  }

  ouvrirEdition(s: Salle) {
    this.modeEdition = true;
    this.salleForm = { ...s };
    this.afficherFormulaire = true;
  }

  validerFormulaire() {
    if (this.modeEdition && this.salleForm.id) {
      this.service.modifierSalle(this.salleForm.id, this.salleForm as Salle).subscribe({
        next: () => {
          this.chargerSalles();
          this.afficherFormulaire = false;
          this.notification.success('Salle modifiée avec succès');
        },
        error: (err) => this.notification.handleError(err, 'Erreur lors de la modification')
      });
    } else {
      this.service.creerSalle(this.salleForm as Salle).subscribe({
        next: () => {
          this.chargerSalles();
          this.afficherFormulaire = false;
          this.notification.success('Salle ajoutée avec succès');
        },
        error: (err) => this.notification.handleError(err, 'Erreur lors de l\'ajout')
      });
    }
  }

  supprimer(id: number) {
    this.service.supprimerSalle(id).subscribe({
      next: () => {
        this.chargerSalles();
        this.confirmation = null;
        this.notification.success('Salle supprimée avec succès');
      },
      error: (err) => this.notification.handleError(err, 'Erreur lors de la suppression')
    });
  }

  typeLabel(type: string): string {
    return this.service.getTypeLabel(type);
  }

  typeIcon(type: string): string {
    return {
      amphitheatre: 'bi-person-video2',
      salle_cours:  'bi-building',
      labo_info:    'bi-pc-display',
      labo_tp:      'bi-wrench-adjustable'
    }[type] || 'bi-door-open';
  }

  typeBadge(type: string): string {
    return { amphitheatre:'violet', salle_cours:'cours', labo_info:'td', labo_tp:'tp' }[type] || 'cours';
  }
}
