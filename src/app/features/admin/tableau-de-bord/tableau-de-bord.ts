import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tableau-de-bord.html',
  styleUrl: './tableau-de-bord.css'
})
export class TableauDeBordComponent implements OnInit {
  stats: any = {
    classes: 0,
    salles: 0,
    departements: 0,
    professeurs: 0,
    seances: { total: 0, cette_semaine: 0 },
    cours: 0,
    filieres: { count: 0, names: [] },
    conflits: 0
  };

  activites = [
    { titre: 'Importation des données',        statut: 'ok',   desc: 'Fichier Excel importé avec succès',      heure: 'Il y a 2h'   },
    { titre: 'Génération des emplois du temps', statut: 'err',  desc: 'Conflit détecté sur Lundi 10h — Labo1',  heure: 'Il y a 3h'   },
    { titre: 'Export PDF Semaine 17',           statut: 'ok',   desc: '6 emplois du temps exportés',            heure: 'Hier 14h30'  },
    { titre: 'Nouveau cours ajouté',            statut: 'info', desc: 'Angular & Frameworks — Dr. Daiif',       heure: 'Hier 09h00'  },
    { titre: 'Modification de salle',           statut: 'warn', desc: 'Labo2 indisponible vendredi prochain',   heure: 'Il y a 2j'   },
  ];

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe({
      next: s => {
        console.log('Dashboard stats received:', s);
        this.stats = s;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error fetching dashboard stats:', err);
      }
    });
  }

  getStatutIcon(s: string): string {
    return { ok:'bi-check-circle-fill', err:'bi-x-circle-fill', warn:'bi-exclamation-triangle-fill', info:'bi-info-circle-fill' }[s] || 'bi-circle';
  }
}
