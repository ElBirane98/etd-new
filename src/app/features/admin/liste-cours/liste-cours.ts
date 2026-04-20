import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursService } from '../../../core/services/cours.service';
import { Cours } from '../../../core/services/cours';

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

  filieres: string[] = [];

  constructor(private service: CoursService) {}

  ngOnInit() {
    this.service.getCours().subscribe(d => {
      this.cours = d;
      this.filieres = [...new Set(d.map(c => c.filiere))];
    });
  }

  get filtres(): Cours[] {
    const q = this.filtre.toLowerCase();
    return this.cours.filter(c =>
      (c.intitule.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) &&
      (!this.filtreFiliere || c.filiere === this.filtreFiliere)
    );
  }

  supprimer(id: number) {
    this.cours = this.cours.filter(c => c.id !== id);
    this.confirmation = null;
  }

  badgeType(type: string): string {
    return { cours:'cours', td:'td', tp:'tp', examen:'examen' }[type] || 'cours';
  }
}
