import { writeFileSync } from 'fs';
import { TaskParams } from '../planner/task';
import { IAction } from './action';

export class WriteFileAction implements IAction {
  public async execute({ path, content }: TaskParams): Promise<void> {
    writeFileSync(path, content || '', { encoding: 'utf-8' });
  }
}
