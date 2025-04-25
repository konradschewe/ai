import { rmSync } from 'fs';
import { TaskParams } from '../planner/task';
import { IAction } from './action';

export class DeleteDirAction implements IAction {
  public async execute({ path }: TaskParams): Promise<void> {
    rmSync(path, { recursive: true, force: true });
  }
}
