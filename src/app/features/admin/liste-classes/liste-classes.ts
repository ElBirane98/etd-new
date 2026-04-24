import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NiveauService } from '../../../core/services/niveau.service';
import { DepartementService } from '../../../core/services/departement.service';
import { Niveau } from '../../../core/services/niveau';
import { Departement } from '../../../core/services/departement';
import { NotificationService } from '../../../core/services/notification.service';

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
  departements: Departement[] = [];

  constructor(
    private service: NiveauService,
    private departementService: DepartementService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  private initialiserClasse(): Partial<Niveau> {
    return {
      nom: '',
      niveau: '',
      departement_id: undefined
    };

  }

  ngOnInit() {
    this.chargerClasses();
    this.chargerDepartements();
  }

  chargerDepartements() {
    this.departementService.getDepartements().subscribe(d => {
      this.departements = d;
      this.cdr.detectChanges();
    });
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
      this.service.modifierNiveau(this.classeForm.id, this.classeForm as Niveau).subscribe({
        next: () => {
          this.chargerClasses();
          this.afficherFormulaire = false;
          this.notification.success('Classe modifiée avec succès');
        },
        error: () => this.notification.error('Erreur lors de la modification')
      });
    } else {
      this.service.creerNiveau(this.classeForm as Niveau).subscribe({
        next: () => {
          this.chargerClasses();
          this.afficherFormulaire = false;
          this.notification.success('Classe ajoutée avec succès');
        },
        error: () => this.notification.error('Erreur lors de l\'ajout')
      });
    }
  }

  supprimer(id: number) {
    this.service.supprimerNiveau(id).subscribe({
      next: () => {
        this.chargerClasses();
        this.confirmation = null;
        this.notification.success('Classe supprimée avec succès');
      },
      error: () => this.notification.error('Erreur lors de la suppression')
    });
  }
}
