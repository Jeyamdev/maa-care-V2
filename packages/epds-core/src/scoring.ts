import { questions } from "./questions";
import type { AssessmentResult, RiskLevel } from "./types";
import { hasSafetyAlert } from "./safety";
import { interpretation } from "./localization";

export function isValidAnswer(answer: unknown): answer is number {
  return typeof answer === "number" && Number.isInteger(answer) && answer >= 0 && answer <= 3;
}
export function isValidAnswers(answers: unknown): answers is number[] {
  return Array.isArray(answers) && answers.length === questions.length &&
    Array.from(answers).every(isValidAnswer);
}
export function scoreAnswer(questionIndex: number, answer: number): number {
  if (!Number.isInteger(questionIndex) || !questions[questionIndex] || !isValidAnswer(answer)) {
    throw new RangeError("Invalid EPDS answer");
  }
  return questions[questionIndex].reverseScore ? answer : 3 - answer;
}
export function calculateTotal(answers: number[]): number {
  if (!isValidAnswers(answers)) throw new RangeError("Incomplete EPDS assessment");
  return answers.reduce((total, answer, index) => total + scoreAnswer(index, answer), 0);
}
export function classifyRisk(totalScore: number): RiskLevel {
  if (!Number.isInteger(totalScore) || totalScore < 0 || totalScore > 30) throw new RangeError("Invalid EPDS total");
  return totalScore <= 9 ? "Low Risk" : totalScore <= 12 ? "Moderate Risk" : "High Risk";
}
export function assess(answers: number[]): AssessmentResult {
  const totalScore = calculateTotal(answers);
  return { totalScore, riskLevel: classifyRisk(totalScore), safetyAlert: hasSafetyAlert(answers), message: interpretation(totalScore) };
}
