import { Command } from 'commander';
import dotenv from 'dotenv';
import figlet from 'figlet';
import { Agent } from './agent';

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
const agent = new Agent();
void agent.run();
