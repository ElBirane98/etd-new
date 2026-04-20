import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { SeanceService } from '../../../core/services/seance.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { CoursService } from '../../../core/services/cours.service';
import { SalleService } from '../../../core/services/salle.service';

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

  jours     = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  heures    = ['07:30','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  types     = [
    { valeur:'cours',  label:'Cours magistral' },
    { valeur:'td',     label:'Travaux Dirigés (TD)' },
    { valeur:'tp',     label:'Travaux Pratiques (TP)' },
    { valeur:'examen', label:'Examen' },
  ];
  classes   = ['M1-GDIL','L3-INFO','M2-GDIL','L2-INFO'];

  enseignants: any[] = [];
  coursList  : any[] = [];
  salles     : any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private seanceService: SeanceService,
    private enseignantService: EnseignantService,
    private coursService: CoursService,
    private salleService: SalleService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      jour:         ['Lundi',   Validators.required],
      heure_debut:  ['08:00',   Validators.required],
      heure_fin:    ['10:00',   Validators.required],
      cours:        ['',        Validators.required],
      enseignant:   ['',        Validators.required],
      salle:        ['',        Validators.required],
      classe:       ['M1-GDIL', Validators.required],
      type:         ['cours',   Validators.required],
    });

    this.enseignantService.getEnseignants().subscribe(d => this.enseignants = d);
    this.coursService.getCours().subscribe(d => this.coursList = d);
    this.salleService.getSalles().subscribe(d => this.salles = d.filter(s => s.disponible));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modeEdition = true;
      this.seanceId = +id;
      this.seanceService.getSeanceById(this.seanceId).subscribe(s => {
        if (s) this.form.patchValue(s);
      });
    }

    this.route.queryParams.subscribe(params => {
      if (params['enseignant']) {
        this.form.patchValue({ enseignant: params['enseignant'] });
      }
    });
  }

  enregistrer() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.enregistrement = true;
    this.erreur = '';

    // Simulation API — remplacer par vrai appel HTTP
    setTimeout(() => {
      this.enregistrement = false;
      this.succes = true;
      setTimeout(() => this.router.navigate(['/admin/grille-edt']), 1500);
    }, 900);
  }

  annuler() { this.router.navigate(['/admin/grille-edt']); }

  isInvalid(champ: string) {
    const ctrl = this.form.get(champ);
    return ctrl && ctrl.invalid && ctrl.touched;
  }
}
