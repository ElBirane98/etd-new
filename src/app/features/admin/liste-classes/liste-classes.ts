import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-classes.html',
  styleUrl: './liste-classes.css'
})
export class ListeClassesComponent implements OnInit {
  classes = [
    { id: 1, nom: 'M1 GDIL', effectif: 25, delegue: 'Jean Dupont', departement: 'Informatique' },
    { id: 2, nom: 'L3 INFO', effectif: 40, delegue: 'Marie Faye', departement: 'Informatique' },
    { id: 3, nom: 'M2 GDIL', effectif: 20, delegue: 'Aliou Sow', departement: 'Informatique' },
  ];
  filtre = '';

  constructor() {}
  ngOnInit() {}

  get filtrees() {
    return this.classes.filter(c => c.nom.toLowerCase().includes(this.filtre.toLowerCase()));
  }
}
