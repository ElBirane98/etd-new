import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SeanceService } from '../../../core/services/seance.service';
import { Seance } from '../../../core/services/seance';
import { ExportService } from '../../../core/services/export.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-liste-seances',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './liste-seances.html',
  styleUrl: './liste-seances.css'
})
export class ListeSeancesComponent implements OnInit {
  seances: Seance[] = [];
  filtre = '';
  confirmation: number | null = null;

  constructor(
    private service: SeanceService,
    private router: Router,
    private exportService: ExportService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.chargerSeances();
  }

  chargerSeances() {
    this.service.getSeances().subscribe(d => {
      this.seances = d;
      this.cdr.detectChanges();
    });
  }

  exporter() {
    const headers = ['ID', 'Jour', 'Début', 'Fin', 'Cours', 'Enseignant', 'Classe', 'Salle', 'Type'];
    this.exportService.exportToCsv('liste_seances', this.seances, headers);
  }

  get filtrees() {
    if (!this.seances) return [];
    const q = (this.filtre || '').toLowerCase();
    return this.seances.filter(s =>
      (s.cours?.toLowerCase() || '').includes(q) ||
      (s.enseignant?.toLowerCase() || '').includes(q) ||
      (s.classe?.toLowerCase() || '').includes(q)
    );
  }

  supprimer(id: number) {
    this.service.supprimerSeance(id).subscribe({
      next: () => {
        this.chargerSeances();
        this.confirmation = null;
        this.notification.success('Séance supprimée avec succès');
      },
      error: () => this.notification.error('Erreur lors de la suppression')
    });
  }

  cssType(type: string): string {
    return { cours: 'cours', td: 'td', tp: 'tp', examen: 'examen' }[type] || 'cours';
  }
}
