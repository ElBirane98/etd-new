import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-filieres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-filieres.html',
  styleUrl: './liste-filieres.css'
})
export class ListeFilieresComponent implements OnInit {
  filieres = [
    { id: 1, nom: 'GDIL', libelle: 'Génie de l\'Informatique et du Logiciel', departement: 'Informatique' },
    { id: 2, nom: 'INFO', libelle: 'Informatique Générale', departement: 'Informatique' },
    { id: 3, nom: 'MATHS', libelle: 'Mathématiques Appliquées', departement: 'Sciences' },
  ];
  filtre = '';

  constructor() {}
  ngOnInit() {}

  get filtrees() {
    return this.filieres.filter(f => f.nom.toLowerCase().includes(this.filtre.toLowerCase()) || f.libelle.toLowerCase().includes(this.filtre.toLowerCase()));
  }
}
