import {
  GenerativeModel,
  GoogleGenerativeAI,
  UsageMetadata,
} from '@google/generative-ai';
import { GEMINI_MODEL, GEMINI_MODEL_COSTS } from './gemini.constants';

export class GeminiModelService {
  protected gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  protected model!: GenerativeModel;

  protected async generate(prompt: string): Promise<any> {
    const { response } = await this.model.generateContent([prompt]);

    if (response.usageMetadata) {
      const costs = this.calculateCosts(response.usageMetadata);
      console.debug(`Costs: $${costs}`);
    }

    const text = response.text();
    try {
      const schema = JSON.parse(text) as any;
      return schema;
    } catch (e) {
      console.error(e);
      throw new Error('Failed to parse the response from the model.');
    }
  }

  private calculateCosts({
    promptTokenCount,
    candidatesTokenCount,
    cachedContentTokenCount,
  }: UsageMetadata): number {
    const { input, output, cache } = GEMINI_MODEL_COSTS[GEMINI_MODEL];
    const oneMillion = 1000000;

    let costs =
      (candidatesTokenCount * input) / oneMillion +
      (promptTokenCount * output) / oneMillion;
    if (cachedContentTokenCount) {
      costs += (cachedContentTokenCount * cache) / oneMillion;
    }

    return costs;
  }
}
