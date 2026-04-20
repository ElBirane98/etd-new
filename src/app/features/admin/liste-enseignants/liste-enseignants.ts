import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { Enseignant } from '../../../core/services/enseignant';

@Component({
  selector: 'app-liste-enseignants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-enseignants.html',
  styleUrl: './liste-enseignants.css'
})
export class ListeEnseignantsComponent implements OnInit {
  enseignants: Enseignant[] = [];
  filtre = '';
  confirmation: number | null = null;

  constructor(private service: EnseignantService) {}

  ngOnInit() {
    this.service.getEnseignants().subscribe(d => this.enseignants = d);
  }

  get filtrees(): Enseignant[] {
    const q = this.filtre.toLowerCase();
    return this.enseignants.filter(e =>
      e.nom.toLowerCase().includes(q) ||
      e.prenom.toLowerCase().includes(q) ||
      e.specialite.toLowerCase().includes(q) ||
      e.departement.toLowerCase().includes(q)
    );
  }

  supprimer(id: number) {
    this.enseignants = this.enseignants.filter(e => e.id !== id);
    this.confirmation = null;
  }

  initiales(e: Enseignant): string {
    return (e.prenom[0] + e.nom[0]).toUpperCase();
  }

  couleurAvatar(id: number): string {
    const couleurs = ['#1e3a6e','#16a34a','#d97706','#7c3aed','#dc2626','#0891b2'];
    return couleurs[id % couleurs.length];
  }
}
