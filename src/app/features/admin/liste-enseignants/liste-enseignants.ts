import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { Enseignant } from '../../../core/services/enseignant';
import { ExportService } from '../../../core/services/export.service';
import { DepartementService } from '../../../core/services/departement.service';
import { Departement } from '../../../core/services/departement';

@Component({
  selector: 'app-liste-enseignants',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './liste-enseignants.html',
  styleUrl: './liste-enseignants.css'
})
export class ListeEnseignantsComponent implements OnInit {
  enseignants: Enseignant[] = [];
  departements: Departement[] = [];
  confirmation: number | null = null;
  afficherFormulaire = false;
  modeEdition = false;
  enseignantForm: Partial<Enseignant> = this.initialiserEnseignant();
  filtre = '';

  constructor(
    private service: EnseignantService,
    private exportService: ExportService,
    private departementService: DepartementService,
    private cdr: ChangeDetectorRef
  ) {}

  exporter() {
    const headers = ['ID', 'Nom', 'Prénom', 'Email', 'Spécialité', 'Département', 'Grade'];
    this.exportService.exportToCsv('liste_enseignants', this.enseignants, headers);
  }

  private initialiserEnseignant(): Partial<Enseignant> {
    return {
      nom: '',
      prenom: '',
      email: '',
      specialite: '',
      departement_id: undefined,
      grade: 'Professeur',
      actif: true
    };
  }

  ngOnInit() {
    this.chargerEnseignants();
    this.departementService.getDepartements().subscribe(d => {
      this.departements = d;
      this.cdr.detectChanges();
    });
  }

  chargerEnseignants() {
    this.service.getEnseignants().subscribe(d => {
      this.enseignants = d;
      this.cdr.detectChanges();
    });
  }

  get filtrees(): Enseignant[] {
    const q = this.filtre.toLowerCase();
    return this.enseignants.filter(e =>
      e.nom.toLowerCase().includes(q) ||
      e.prenom.toLowerCase().includes(q) ||
      e.specialite.toLowerCase().includes(q) ||
      e.departement.toLowerCase().includes(q)
    );
  }

  ouvrirAjout() {
    this.modeEdition = false;
    this.enseignantForm = this.initialiserEnseignant();
    this.afficherFormulaire = true;
  }

  ouvrirEdition(e: Enseignant) {
    this.modeEdition = true;
    this.enseignantForm = { ...e };
    this.afficherFormulaire = true;
  }

  validerFormulaire() {
    if (this.modeEdition && this.enseignantForm.id) {
      this.service.modifierEnseignant(this.enseignantForm.id, this.enseignantForm as Enseignant).subscribe(() => {
        this.chargerEnseignants();
        this.afficherFormulaire = false;
      });
    } else {
      this.service.creerEnseignant(this.enseignantForm as Enseignant).subscribe(() => {
        this.chargerEnseignants();
        this.afficherFormulaire = false;
      });
    }
  }

  supprimer(id: number) {
    this.service.supprimerEnseignant(id).subscribe(() => {
      this.chargerEnseignants();
      this.confirmation = null;
    });
  }

  initiales(e: Enseignant): string {
    return (e.prenom[0] + e.nom[0]).toUpperCase();
  }

  couleurAvatar(id: number): string {
    const couleurs = ['#1e3a6e','#16a34a','#d97706','#7c3aed','#dc2626','#0891b2'];
    return couleurs[id % couleurs.length];
  }
}
