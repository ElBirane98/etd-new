import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalleService } from '../../../core/services/salle.service';
import { Salle } from '../../../core/services/salle';

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

  types = [
    { valeur:'amphitheatre', label:'Amphithéâtre'     },
    { valeur:'salle_cours',  label:'Salle de cours'   },
    { valeur:'labo_info',    label:'Laboratoire Info'  },
    { valeur:'labo_tp',      label:'Laboratoire TP'    },
  ];

  constructor(private service: SalleService) {}

  ngOnInit() {
    this.service.getSalles().subscribe(d => this.salles = d);
  }

  get filtrees(): Salle[] {
    const q = this.filtre.toLowerCase();
    return this.salles.filter(s =>
      (s.nom.toLowerCase().includes(q) || s.batiment.toLowerCase().includes(q)) &&
      (!this.filtreType || s.type === this.filtreType)
    );
  }

  supprimer(id: number) {
    this.salles = this.salles.filter(s => s.id !== id);
    this.confirmation = null;
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
