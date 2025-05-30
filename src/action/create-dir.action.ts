import { mkdirSync } from 'fs';
import { TaskParams } from '../planner/task';
import { IAction } from './action';

export class CreateDirAction implements IAction {
  public async execute({ path }: TaskParams): Promise<void> {
    console.debug(`Creating directory: ${path}`);
    mkdirSync(path, { recursive: true });
  }
}
