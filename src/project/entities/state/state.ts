import { StateFactory } from './state.factory';
import { ProjectException } from '../../exception/project.exception';

export abstract class State {
  protected name;
  protected stateTransition: string[];

  protected constructor(name: string, stateTransiction: string[]) {
    this.name = name;
    this.stateTransition = stateTransiction;
  }

  public next(state: string): State {
    if (this.stateTransition.find((s) => s == state)) {
      return StateFactory.getState(state);
    } else {
      throw new ProjectException(
        null,
        `El projecto no puede transicionar al estado ${state}`,
        30005,
      );
    }
  }

  public toString(): string {
    return this.name;
  }
}
