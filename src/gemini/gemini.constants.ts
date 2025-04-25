export enum GeminiModel {
  GEMINI_1_5_FLASH = 'gemini-1.5-flash',
  GEMINI_1_5_PRO = 'gemini-1.5-pro',
}

export const GEMINI_MODEL = GeminiModel.GEMINI_1_5_FLASH;

// per million tokens in USD
export const GEMINI_MODEL_COSTS: Record<
  GeminiModel,
  {
    input: number;
    output: number;
    cache: number;
  }
> = {
  [GeminiModel.GEMINI_1_5_FLASH]: {
    input: 0.075,
    output: 0.3,
    cache: 0.01875,
  },
  [GeminiModel.GEMINI_1_5_PRO]: {
    input: 1.25,
    output: 5,
    cache: 0.3125,
  },
};
