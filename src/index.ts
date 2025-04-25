import { input } from '@inquirer/prompts';
import { Command } from 'commander';
import dotenv from 'dotenv';
import figlet from 'figlet';
import { Action } from './actor/action';
import { plannerModelService } from './planner/planner.model.service';

dotenv.config();

const program = new Command();

console.log(figlet.textSync('AI CLI'));

program
  .version('1.0.0')
  .description('A CLI for managing a project using AI')
  // .option('-i, --init', 'Initialize a new project')
  .parse(process.argv);

// const options = program.opts();
// console.log('Options:', options);
const run = async () => {
  const request = await input({
    message: 'How can I help you?',
  });

  const tasks = await plannerModelService.plan(request);
  for (const task of tasks) {
    const action = new Action(task);
    await action.execute();
  }
};

void run();
