import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreneauService } from '../../../core/services/creneau.service';
import { Creneau } from '../../../core/services/creneau';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-liste-creneaux',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-creneaux.html',
  styleUrl: './liste-creneaux.css'
})
export class ListeCreneauxComponent implements OnInit {
  creneaux: Creneau[] = [];
  filtre = '';
  confirmation: number | null | undefined = null;

  afficherFormulaire = false;
  modeEdition = false;
  creneauForm: Partial<Creneau> = this.initialiserCreneau();

  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(
    private service: CreneauService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  private initialiserCreneau(): Partial<Creneau> {
    return {
      jour: 'Lundi',
      debut: '08:00',
      fin: '10:00'
    };
  }

  ngOnInit() {
    this.chargerCreneaux();
  }

  chargerCreneaux() {
    this.service.getCreneaux().subscribe(d => {
      this.creneaux = d;
      this.cdr.detectChanges();
    });
  }

  get filtrees() {
    return this.creneaux.filter(c => 
      c.jour.toLowerCase().includes(this.filtre.toLowerCase()) ||
      c.debut.includes(this.filtre) ||
      c.fin.includes(this.filtre)
    );
  }

  ouvrirAjout() {
    this.modeEdition = false;
    this.creneauForm = this.initialiserCreneau();
    this.afficherFormulaire = true;
  }

  ouvrirEdition(c: Creneau) {
    this.modeEdition = true;
    this.creneauForm = { ...c };
    this.afficherFormulaire = true;
  }

  validerFormulaire() {
    if (this.modeEdition && this.creneauForm.id) {
      this.service.modifierCreneau(this.creneauForm.id, this.creneauForm as Creneau).subscribe({
        next: () => {
          this.chargerCreneaux();
          this.afficherFormulaire = false;
          this.notification.success('Créneau modifié avec succès');
        },
        error: () => this.notification.error('Erreur lors de la modification')
      });
    } else {
      this.service.creerCreneau(this.creneauForm as Creneau).subscribe({
        next: () => {
          this.chargerCreneaux();
          this.afficherFormulaire = false;
          this.notification.success('Créneau ajouté avec succès');
        },
        error: () => this.notification.error('Erreur lors de l\'ajout')
      });
    }
  }

  supprimer(id: number) {
    this.service.supprimerCreneau(id).subscribe({
      next: () => {
        this.chargerCreneaux();
        this.confirmation = null;
        this.notification.success('Créneau supprimé avec succès');
      },
      error: () => this.notification.error('Erreur lors de la suppression')
    });
  }
}
