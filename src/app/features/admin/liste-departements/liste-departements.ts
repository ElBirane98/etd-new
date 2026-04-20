import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-departements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-departements.html',
  styleUrl: './liste-departements.css'
})
export class ListeDepartementsComponent implements OnInit {
  departements = [
    { id: 1, nom: 'Informatique', chef: 'Dr. Ndiaye', effectif_enseignants: 15 },
    { id: 2, nom: 'Mathématiques', chef: 'Pr. Traoré', effectif_enseignants: 10 },
  ];
  filtre = '';

  constructor() {}
  ngOnInit() {}

  get filtrees() {
    return this.departements.filter(d => d.nom.toLowerCase().includes(this.filtre.toLowerCase()));
  }
}
