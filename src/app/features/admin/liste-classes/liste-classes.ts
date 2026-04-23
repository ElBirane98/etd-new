import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NiveauService } from '../../../core/services/niveau.service';
import { Niveau } from '../../../core/services/niveau';

@Component({
  selector: 'app-liste-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-classes.html',
  styleUrl: './liste-classes.css'
})
export class ListeClassesComponent implements OnInit {
  classes: Niveau[] = [];
  filtre = '';
  confirmation: number | null = null;
  afficherFormulaire = false;
  modeEdition = false;
  classeForm: Partial<Niveau> = this.initialiserClasse();

  constructor(
    private service: NiveauService,
    private cdr: ChangeDetectorRef
  ) {}

  private initialiserClasse(): Partial<Niveau> {
    return {
      nom: '',
      niveau: '',
      departement: ''
    };
  }

  ngOnInit() {
    this.chargerClasses();
  }

  chargerClasses() {
    this.service.getNiveaux().subscribe(d => {
      this.classes = d;
      this.cdr.detectChanges();
    });
  }

  get filtrees() {
    return this.classes.filter(c => c.nom.toLowerCase().includes(this.filtre.toLowerCase()));
  }

  ouvrirAjout() {
    this.modeEdition = false;
    this.classeForm = this.initialiserClasse();
    this.afficherFormulaire = true;
  }

  ouvrirEdition(c: Niveau) {
    this.modeEdition = true;
    this.classeForm = { ...c };
    this.afficherFormulaire = true;
  }

  validerFormulaire() {
    if (this.modeEdition && this.classeForm.id) {
      this.service.modifierNiveau(this.classeForm.id, this.classeForm as Niveau).subscribe(() => {
        this.chargerClasses();
        this.afficherFormulaire = false;
      });
    } else {
      this.service.creerNiveau(this.classeForm as Niveau).subscribe(() => {
        this.chargerClasses();
        this.afficherFormulaire = false;
      });
    }
  }

  supprimer(id: number) {
    this.service.supprimerNiveau(id).subscribe(() => {
      this.chargerClasses();
      this.confirmation = null;
    });
  }
}
