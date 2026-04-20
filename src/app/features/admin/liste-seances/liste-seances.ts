import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeanceService } from '../../../core/services/seance.service';
import { Seance } from '../../../core/services/seance';

@Component({
  selector: 'app-liste-seances',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-seances.html',
  styleUrl: './liste-seances.css'
})
export class ListeSeancesComponent implements OnInit {
  seances: Seance[] = [];
  filtre = '';

  constructor(private service: SeanceService) {}

  ngOnInit() {
    this.service.getSeances().subscribe(d => this.seances = d);
  }

  get filtrees() {
    const q = this.filtre.toLowerCase();
    return this.seances.filter(s =>
      s.cours.toLowerCase().includes(q) ||
      s.enseignant.toLowerCase().includes(q) ||
      s.classe.toLowerCase().includes(q)
    );
  }

  cssType(type: string): string {
    return { cours: 'cours', td: 'td', tp: 'tp', examen: 'examen' }[type] || 'cours';
  }
}
