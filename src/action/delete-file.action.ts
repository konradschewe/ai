import { unlinkSync } from 'fs';
import { TaskParams } from '../planner/task';
import { IAction } from './action';

export class DeleteFileAction implements IAction {
  public async execute({ path }: TaskParams): Promise<void> {
    unlinkSync(path);
  }
}
