import dotenv from 'dotenv';
import path from 'path';
import { GEMINI_MODEL } from '../gemini/gemini.constants';
import { GeminiModelService } from '../gemini/gemini.model.service';
import { PlannerModelResponse } from './planner.model.response';
import { PLANNER_MODEL_SCHEMA } from './planner.model.schema';
dotenv.config({ path: path.resolve('./.env') });

export class PlannerModelService extends GeminiModelService {
  protected model = this.gemini.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: PLANNER_MODEL_SCHEMA,
    },
  });

  async plan(requirements: string): Promise<PlannerModelResponse> {
    let prompt =
      'Please plan the necessary steps to fulfill the requirements: ' +
      requirements;
    prompt += '\n\n' + 'Ask any clarifying inquerying questions if needed.';
    const response = await this.generate(prompt);
    return response as PlannerModelResponse;
  }
}

export const plannerModelService = new PlannerModelService();
