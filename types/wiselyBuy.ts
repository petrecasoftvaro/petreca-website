import Questions from "@/components/CompraConsiente/Questions";

export type FeelingType = 'good' | 'bad' | 'neutral';

export type QuestionFieldType = 
  | 'string'
  | 'number'
  | 'boolean'
  | 'feelingType';

export type QuestionField = {
  type: QuestionFieldType;
  required: boolean;
  title: string;
  points: number;
  defaultValue: string | number | boolean | FeelingType;
  suffix?: string;
};

export type QuestionsType = {
  name: QuestionField;
  price: QuestionField;
  durability: QuestionField;
  timesUsing: QuestionField;
  isImpulse: QuestionField;
  isNeeded: QuestionField;
  isOftenNeeded: QuestionField;
  thereIsSomethingSimilar: QuestionField;
  canIpay: QuestionField;
  insideBudget: QuestionField;
  willGenerateFutureCosts: QuestionField;
  stillWantIn30Days: QuestionField;
  tenMinutesLater: QuestionField;
  tenMonthsLater: QuestionField;
  tenYearsLater: QuestionField;
  // costPerUse: QuestionField;
  isWorthIt: QuestionField;
  hasCheaperOptions: QuestionField;
  betterSolution: QuestionField;
} 

type MapSchemaTypes = {
  string: string;
  number: number;
  boolean: boolean;
  feelingType: FeelingType;
};
type MapSchema<T extends Record<string, { type: keyof MapSchemaTypes }>> = {
  [K in keyof T]: MapSchemaTypes[T[K]["type"]];
};

export type Inputs = MapSchema<typeof Questions>;