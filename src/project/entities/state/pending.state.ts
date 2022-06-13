import { State } from './state';
import { State as Statee } from '../../enum/state.enum';

export class Pending extends State {
  constructor() {
    super('PENDING', [Statee.GOING, Statee.SUSPEND]);
  }
}
