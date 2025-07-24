import { QuestionField } from "@/types/wiselyBuy";

export const calculatePoints = (
    question: QuestionField,
    value: string | number | boolean
  ) => {
    if (question.type === "boolean") {
      return value ? question.points : 0;
    } else if (question.type === "feelingType") {
      switch (value) {
        case "good":
          return question.points;
        case "bad":
          return -question.points;
        case "neutral":
          return 0;
        default:
          return 0;
      }
    }
  };
  