export enum TaskType {
  CREATE_DIR = 'create-dir',
  DELETE_DIR = 'delete-dir',
  WRITE_FILE = 'create-file',
  DELETE_FILE = 'delete-file',
}

export type TaskParams = {
  path: string;
  content?: string;
};

export type Task = {
  type: TaskType;
  params: TaskParams;
};
