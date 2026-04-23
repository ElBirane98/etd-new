import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiliereService } from '../../../core/services/filiere.service';
import { Filiere } from '../../../core/services/filiere';
import { DepartementService } from '../../../core/services/departement.service';
import { Departement } from '../../../core/services/departement';

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
    private cdr: ChangeDetectorRef
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
      this.filiereService.modifierFiliere(this.currentFiliere.id, this.currentFiliere).subscribe(() => {
        this.chargerFilieres();
        this.fermerModal();
      });
    } else {
      this.filiereService.creerFiliere(this.currentFiliere).subscribe(() => {
        this.chargerFilieres();
        this.fermerModal();
      });
    }
  }

  supprimer(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette filière ?')) {
      this.filiereService.supprimerFiliere(id).subscribe(() => {
        this.chargerFilieres();
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
