import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiliereService } from '../../../core/services/filiere.service';
import { Filiere } from '../../../core/services/filiere';
import { DepartementService } from '../../../core/services/departement.service';
import { Departement } from '../../../core/services/departement';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-liste-filieres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-filieres.html',
  styleUrl: './liste-filieres.css'
})
export class ListeFilieresComponent implements OnInit {
  filieres: Filiere[] = [];
  departements: Departement[] = [];
  filtre = '';

  showModal = false;
  isEditing = false;
  currentFiliere: Filiere = this.initialFiliere();

  constructor(
    private filiereService: FiliereService,
    private departementService: DepartementService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.chargerFilieres();
    this.chargerDepartements();
  }

  initialFiliere(): Filiere {
    return { id: 0, nom: '', libelle: '', departement_id: 0 };
  }

  chargerFilieres() {
    this.filiereService.getFilieres().subscribe(data => {
      this.filieres = data;
      this.cdr.detectChanges();
    });
  }

  chargerDepartements() {
    this.departementService.getDepartements().subscribe(data => {
      this.departements = data;
      this.cdr.detectChanges();
    });
  }

  ouvrirModal(filiere?: Filiere) {
    if (filiere) {
      this.isEditing = true;
      this.currentFiliere = { ...filiere };
    } else {
      this.isEditing = false;
      this.currentFiliere = this.initialFiliere();
    }
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
  }

  enregistrer() {
    if (this.isEditing) {
      this.filiereService.modifierFiliere(this.currentFiliere.id, this.currentFiliere).subscribe({
        next: () => {
          this.chargerFilieres();
          this.fermerModal();
          this.notification.success('Filière modifiée avec succès');
        },
        error: () => this.notification.error('Erreur lors de la modification')
      });
    } else {
      this.filiereService.creerFiliere(this.currentFiliere).subscribe({
        next: () => {
          this.chargerFilieres();
          this.fermerModal();
          this.notification.success('Filière ajoutée avec succès');
        },
        error: () => this.notification.error('Erreur lors de l\'ajout')
      });
    }
  }

  supprimer(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette filière ?')) {
      this.filiereService.supprimerFiliere(id).subscribe({
        next: () => {
          this.chargerFilieres();
          this.notification.success('Filière supprimée avec succès');
        },
        error: () => this.notification.error('Erreur lors de la suppression')
      });
    }
  }

  get filtrees() {
    return this.filieres.filter(f => 
      f.nom.toLowerCase().includes(this.filtre.toLowerCase()) || 
      f.libelle.toLowerCase().includes(this.filtre.toLowerCase())
    );
  }
}
