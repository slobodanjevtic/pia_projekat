import { Discipline } from './discipline.model';

export class Athlete {
  id: number;
  name: string;
  surname: string;
  gender: string;
  sport: string;
  discipline: string;
  nation: string;

  idSport: number;
  disciplines: Array<number>;
  competitions: Array<number>;
  newCompetitions: Array<number>;
  event: number;
  round: number;
  series: number;
  result: string;
  place: number;
  gold: number;
  silver: number;
  bronze: number;
  show: boolean;
  seed: number;
}
