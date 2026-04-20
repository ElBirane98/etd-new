export interface Salle {
  id: number;
  nom: string;
  capacite: number;
  type: 'amphitheatre' | 'salle_cours' | 'labo_info' | 'labo_tp';
  batiment: string;
  disponible: boolean;
}
