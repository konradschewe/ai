export enum TaskType {
  CREATE_DIR = 'create-dir',
  DELETE_DIR = 'delete-dir',
  WRITE_FILE = 'create-file',
  DELETE_FILE = 'delete-file',
  EXEC_CMD = 'exec-cmd',
}

export type TaskParams = {
  path: string;
  fileContent?: string;
  command?: string;
};

export type Task = {
  type: TaskType;
  params: TaskParams;
};
