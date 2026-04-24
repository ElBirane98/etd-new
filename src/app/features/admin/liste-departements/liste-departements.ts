import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartementService } from '../../../core/services/departement.service';
import { Departement } from '../../../core/services/departement';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-liste-departements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-departements.html',
  styleUrl: './liste-departements.css'
})
export class ListeDepartementsComponent implements OnInit {
  departements: Departement[] = [];
  filtre = '';
  confirmation: number | null = null;
  afficherFormulaire = false;
  modeEdition = false;
  departementForm: Partial<Departement> = { nom: '', chef: '' };

  constructor(
    private service: DepartementService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.chargerDepartements();
  }

  chargerDepartements() {
    this.service.getDepartements().subscribe(d => {
      this.departements = d;
      this.cdr.detectChanges();
    });
  }

  get filtrees() {
    return this.departements.filter(d => d.nom.toLowerCase().includes(this.filtre.toLowerCase()));
  }

  ouvrirAjout() {
    this.modeEdition = false;
    this.departementForm = { nom: '', chef: '' };
    this.afficherFormulaire = true;
  }

  ouvrirEdition(d: Departement) {
    this.modeEdition = true;
    this.departementForm = { ...d };
    this.afficherFormulaire = true;
  }

  validerFormulaire() {
    if (this.modeEdition && this.departementForm.id) {
      this.service.modifierDepartement(this.departementForm.id, this.departementForm as Departement).subscribe({
        next: () => {
          this.chargerDepartements();
          this.afficherFormulaire = false;
          this.notification.success('Département modifié avec succès');
        },
        error: () => this.notification.error('Erreur lors de la modification')
      });
    } else {
      this.service.creerDepartement(this.departementForm as Departement).subscribe({
        next: () => {
          this.chargerDepartements();
          this.afficherFormulaire = false;
          this.notification.success('Département ajouté avec succès');
        },
        error: () => this.notification.error('Erreur lors de l\'ajout')
      });
    }
  }

  supprimer(id: number) {
    this.service.supprimerDepartement(id).subscribe({
      next: () => {
        this.chargerDepartements();
        this.confirmation = null;
        this.notification.success('Département supprimé avec succès');
      },
      error: () => this.notification.error('Erreur lors de la suppression')
    });
  }
}
