export interface Enseignant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
  departement: string;
  departement_id?: number;
  grade: string;
  actif: boolean;
}
