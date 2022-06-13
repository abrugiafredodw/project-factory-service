import { State } from './state';
import { State as Statee } from '../../enum/state.enum';

export class Going extends State {
  constructor() {
    super('GOING', [Statee.DONE, Statee.SUSPEND]);
  }
}
