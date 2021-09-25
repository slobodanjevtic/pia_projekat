import { Discipline } from './discipline.model';

export class Athlete {
  id: number;
  name: string;
  surname: string;
  gender: string;
  idSport: number;
  sport: string;
  disciplines: Array<number>;
  disciplinesObject: Array<string>;
  nation: string;
  gold: number;
  silver: number;
  bronze: number;
  show: boolean;
}
