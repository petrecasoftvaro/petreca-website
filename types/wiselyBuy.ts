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
};

export type QuestionsType = {
  name: QuestionField;
  price: QuestionField;
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