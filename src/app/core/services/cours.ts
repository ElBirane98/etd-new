export interface Cours {
  id: number;
  code: string;
  intitule: string;
  credits: number;
  filiere: string;
  semestre: number;
  type_seances: string[];
  volume_horaire: number;
}
