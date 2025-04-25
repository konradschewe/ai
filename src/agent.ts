import { input } from '@inquirer/prompts';
import { Action } from './action/action';
import { plannerModelService } from './planner/planner.model.service';
import { Task } from './planner/task';

export class Agent {
  async run() {
    const request = await input({
      message: 'How can I help you?',
    });

    await this.process(request);
    await this.continue();
  }

  async continue() {
    const request = await input({
      message: 'What do you want to do next?',
    });

    await this.process(request);
  }

  private async process(request: string) {
    const tasks = await this.plan(request);

    for (const task of tasks) {
      const action = new Action(task);
      await action.execute();
    }
  }

  private async plan(request: string): Promise<Task[]> {
    let plan = await plannerModelService.plan(request);

    if (plan.inquiries.length > 0) {
      let inquiryPrompt =
        'The following Q&A helps to give clearer instructions:\n\n';
      do {
        for (const inquiry of plan.inquiries) {
          const answer = await input({
            message: inquiry,
          });
          inquiryPrompt += `\n\nQ: ${inquiry}\nA: ${answer}`;
        }
        request += inquiryPrompt;
        plan = await plannerModelService.plan(request);
      } while (plan.inquiries.length > 0);
    }

    return plan.tasks;
  }
}
