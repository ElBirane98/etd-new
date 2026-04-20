export interface Seance {
  id: number;
  jour: string;
  heure_debut: string;
  heure_fin: string;
  cours: string;
  cours_abr: string;
  enseignant: string;
  enseignant_init: string;
  salle: string;
  classe: string;
  type: 'cours' | 'td' | 'tp' | 'examen';
}
