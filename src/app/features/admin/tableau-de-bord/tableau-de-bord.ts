import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeanceService } from '../../../core/services/seance.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { CoursService } from '../../../core/services/cours.service';
import { SalleService } from '../../../core/services/salle.service';

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tableau-de-bord.html',
  styleUrl: './tableau-de-bord.css'
})
export class TableauDeBordComponent implements OnInit {
  stats = { seances: 0, enseignants: 0, cours: 0, salles: 0 };

  activites = [
    { titre: 'Importation des données',        statut: 'ok',   desc: 'Fichier Excel importé avec succès',      heure: 'Il y a 2h'   },
    { titre: 'Génération des emplois du temps', statut: 'err',  desc: 'Conflit détecté sur Lundi 10h — Labo1',  heure: 'Il y a 3h'   },
    { titre: 'Export PDF Semaine 17',           statut: 'ok',   desc: '6 emplois du temps exportés',            heure: 'Hier 14h30'  },
    { titre: 'Nouveau cours ajouté',            statut: 'info', desc: 'Angular & Frameworks — Dr. Daiif',       heure: 'Hier 09h00'  },
    { titre: 'Modification de salle',           statut: 'warn', desc: 'Labo2 indisponible vendredi prochain',   heure: 'Il y a 2j'   },
  ];

  constructor(
    private seanceService: SeanceService,
    private enseignantService: EnseignantService,
    private coursService: CoursService,
    private salleService: SalleService
  ) {}

  ngOnInit() {
    this.seanceService.getSeances().subscribe(d => this.stats.seances = d.length);
    this.enseignantService.getEnseignants().subscribe(d => this.stats.enseignants = d.length);
    this.coursService.getCours().subscribe(d => this.stats.cours = d.length);
    this.salleService.getSalles().subscribe(d => this.stats.salles = d.length);
  }

  getStatutIcon(s: string): string {
    return { ok:'bi-check-circle-fill', err:'bi-x-circle-fill', warn:'bi-exclamation-triangle-fill', info:'bi-info-circle-fill' }[s] || 'bi-circle';
  }
}
