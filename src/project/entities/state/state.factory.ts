import { State } from './state';
import { Pending } from './pending.state';
import { ProjectException } from '../../exception/project.exception';
import { Suspend } from './suspend.state';
import { Going } from './going.state';

export class StateFactory {
  public static getState(state: string): State {
    switch (state) {
      case 'PENDING':
        return new Pending();
      case 'GOING':
        return new Going();
      case 'SUSPEND':
        return new Suspend();
      case 'DONE':
        return undefined;
      default:
        throw new ProjectException(null, 'No existe el estado', 30005);
    }
  }
}
