import { rmSync } from 'fs';
import { TaskParams } from '../planner/task';
import { IAction } from './action';

export class DeleteDirAction implements IAction {
  public async execute({ path }: TaskParams): Promise<void> {
    console.debug(`Deleting directory: ${path}`);
    rmSync(path, { recursive: true, force: true });
  }
}
