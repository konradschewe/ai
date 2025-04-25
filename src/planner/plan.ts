import { Inquiry } from './inquiry';
import { Task } from './task';

export type Plan = {
  inquiries: Inquiry[];
  tasks: Task[];
};
