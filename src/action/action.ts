import { Task, TaskParams, TaskType } from '../planner/task';
import { CreateDirAction } from './create-dir.action';
import { DeleteDirAction } from './delete-dir.action';
import { DeleteFileAction } from './delete-file.action';
import { ExecCmdAction } from './exec-cmd.action';
import { WriteFileAction } from './write-file.action';

export interface IAction {
  execute(params: TaskParams): Promise<void>;
}

export const ACTIONS: Record<TaskType, IAction> = {
  [TaskType.CREATE_DIR]: new CreateDirAction(),
  [TaskType.DELETE_DIR]: new DeleteDirAction(),
  [TaskType.WRITE_FILE]: new WriteFileAction(),
  [TaskType.DELETE_FILE]: new DeleteFileAction(),
  [TaskType.EXEC_CMD]: new ExecCmdAction(),
};

export class Action implements IAction {
  constructor(private readonly task: Task) {}

  public async execute(): Promise<void> {
    const action = ACTIONS[this.task.type];
    if (!action) {
      throw new Error(`Action not found for task type: ${this.task.type}`);
    }
    await action.execute(this.task.params);
  }
}
