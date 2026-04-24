import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { SeanceService } from '../../../core/services/seance.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { CoursService } from '../../../core/services/cours.service';
import { SalleService } from '../../../core/services/salle.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-formulaire-seance',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './formulaire-seance.html',
  styleUrl: './formulaire-seance.css'
})
export class FormulaireSeanceComponent implements OnInit {
  form!: FormGroup;
  modeEdition = false;
  seanceId: number | null = null;
  enregistrement = false;
  succes = false;
  erreur = '';

  jours     : string[] = [];
  creneauxList: any[] = [];
  types     = [
    { valeur:'cours',  label:'Cours magistral' },
    { valeur:'td',     label:'Travaux Dirigés (TD)' },
    { valeur:'tp',     label:'Travaux Pratiques (TP)' },
    { valeur:'examen', label:'Examen' },
  ];
  classes: string[] = [];

  enseignants: any[] = [];
  coursList  : any[] = [];
  salles     : any[] = [];
  seancesExistantes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private seanceService: SeanceService,
    private enseignantService: EnseignantService,
    private coursService: CoursService,
    private salleService: SalleService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      creneau_horaire_id: ['', Validators.required],
      cour_id:           ['', Validators.required],
      professeur_id:     ['', Validators.required],
      salle_id:          ['', Validators.required],
      type:              ['cours', Validators.required],
      classe:            ['', Validators.required], // Still useful for conflict checking or display
    });

    this.enseignantService.getEnseignants().subscribe(d => { this.enseignants = d; this.cdr.detectChanges(); });
    this.coursService.getCours().subscribe(d => { this.coursList = d; this.cdr.detectChanges(); });
    this.salleService.getSalles().subscribe(d => { this.salles = d.filter(s => s.disponible); this.cdr.detectChanges(); });
    this.seanceService.getSeances().subscribe(d => { this.seancesExistantes = d; this.cdr.detectChanges(); });
    this.seanceService.getClasses().subscribe(d => { this.classes = d; this.cdr.detectChanges(); });
    this.seanceService.getCreneaux().subscribe(d => {
        this.creneauxList = d;
        this.jours = [...new Set(d.map((c: any) => c.jour))];
        this.cdr.detectChanges();
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modeEdition = true;
      this.seanceId = +id;
      // Note: We might need to map the backend IDs back to the form
      this.seanceService.getSeanceById(this.seanceId).subscribe(s => {
        if (s) {
            this.form.patchValue({
                type: s.type,
            });
            this.cdr.detectChanges();
        }
      });
    }
  }

  enregistrer() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const conflit = this.verifierConflits();
    if (conflit) {
      this.erreur = conflit;
      this.notification.error(conflit); // Afficher aussi dans le centre de notifications
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }


    this.enregistrement = true;
    this.erreur = '';
    const data = this.form.value;
    console.log('Enregistrement de la séance...', data);

    const observation = this.modeEdition && this.seanceId 
      ? this.seanceService.modifierSeance(this.seanceId, data)
      : this.seanceService.creerSeance(data);

    observation.subscribe({
      next: (res) => {
        console.log('Succès serveur:', res);
        this.finaliserEnregistrement();
      },
      error: (err) => {
        console.error('Erreur serveur:', err);
        this.gererErreur(err);
      }
    });
  }



  private verifierConflits(): string | null {
    const d = this.form.value;
    const currentCreneau = this.creneauxList.find(c => c.id == d.creneau_horaire_id);
    if (!currentCreneau) return null;

    for (const s of this.seancesExistantes) {
      if (this.modeEdition && s.id === this.seanceId) continue;
      
      // Note: s here is from SeanceService.getSeances() which returns mapped Seance objects
      // These objects currently have jour, heure_debut, heure_fin as strings
      if (s.jour !== currentCreneau.jour) continue;

      const sh1 = this.toMinutes(s.heure_debut);
      const sh2 = this.toMinutes(s.heure_fin);
      const h1 = this.toMinutes(currentCreneau.debut);
      const h2 = this.toMinutes(currentCreneau.fin);

      const chevauche = (h1 < sh2 && h2 > sh1);

      if (chevauche) {
        // We'd need to map the names back to IDs or vice versa to check accurately
        // Since s.salle is a string (nom), we compare with the name of d.salle_id
        const selectedSalle = this.salles.find(x => x.id == d.salle_id);
        if (selectedSalle && s.salle === selectedSalle.nom) return `La salle ${selectedSalle.nom} est déjà occupée sur ce créneau.`;
        
        const selectedProf = this.enseignants.find(x => x.id == d.professeur_id);
        if (selectedProf && s.enseignant === (selectedProf.prenom + ' ' + selectedProf.nom)) return `L'enseignant ${selectedProf.prenom} ${selectedProf.nom} a déjà un cours sur ce créneau.`;
        
        if (s.classe === d.classe) return `La classe ${d.classe} a déjà un cours sur ce créneau.`;
      }
    }
    return null;
  }

  private toMinutes(h: string): number {
    const [hrs, mins] = h.split(':').map(Number);
    return hrs * 60 + mins;
  }

  getCoursLabel(): string {
    const c = this.coursList.find(x => x.id == this.form.value.cour_id);
    return c ? c.intitule : 'Nom du cours';
  }

  getCreneauLabel(): string {
    const cr = this.creneauxList.find(x => x.id == this.form.value.creneau_horaire_id);
    return cr ? `${cr.jour} · ${cr.debut}–${cr.fin}` : 'Jour et horaire';
  }

  getSalleLabel(): string {
    const s = this.salles.find(x => x.id == this.form.value.salle_id);
    return s ? s.nom : '—';
  }

  getEnseignantLabel(): string {
    const e = this.enseignants.find(x => x.id == this.form.value.professeur_id);
    return e ? `${e.prenom} ${e.nom}` : '—';
  }

  private finaliserEnregistrement() {
    this.enregistrement = false;
    this.succes = true;
    this.notification.success(this.modeEdition ? 'Séance modifiée avec succès' : 'Séance créée avec succès');
    setTimeout(() => this.router.navigate(['/admin/grille-edt']), 1500);
  }

  private gererErreur(err: any) {
    this.enregistrement = false;
    this.notification.handleError(err, 'Une erreur est survenue lors de l\'enregistrement.');
    console.error(err);
  }


  annuler() { this.router.navigate(['/admin/grille-edt']); }

  isInvalid(champ: string) {
    const ctrl = this.form.get(champ);
    return ctrl && ctrl.invalid && ctrl.touched;
  }
}
