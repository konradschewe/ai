import { writeFileSync } from 'fs';
import { TaskParams } from '../planner/task';
import { IAction } from './action';

export class WriteFileAction implements IAction {
  public async execute({
    path,
    fileContent: content,
  }: TaskParams): Promise<void> {
    console.debug(`Writing to file: ${path}`);
    writeFileSync(path, content || '', { encoding: 'utf-8' });
  }
}
