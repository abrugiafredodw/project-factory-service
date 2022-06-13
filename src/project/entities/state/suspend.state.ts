import { State } from './state';
import { State as Statee } from '../../enum/state.enum';

export class Suspend extends State {
  constructor() {
    super('SUSPEND',[Statee.PENDING]);
  }


}
