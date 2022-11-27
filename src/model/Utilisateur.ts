import { Todo } from "./todo";

export class Utilisateur {
  nom: string;
  motdepasse: string;
  todo: Todo[];

  constructor(nom: string, motdepasse: string) {
    this.nom = nom;
    this.motdepasse = motdepasse;
    this.todo = [];
  }
}
