import { execSync } from 'child_process';
import { TaskParams } from '../planner/task';
import { IAction } from './action';

export class ExecCmdAction implements IAction {
  public async execute({ command }: TaskParams): Promise<void> {
    if (!command) {
      throw new Error('Command is required for ExecCmdAction');
    }

    console.debug(`Executing command: ${command}`);
    execSync(command, { stdio: 'inherit' });
  }
}
