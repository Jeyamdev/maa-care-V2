// Safety is independent of the total score and risk classification.
export function hasSafetyAlert(answers: readonly number[] | null): boolean {
  const answer = answers?.[9];
  return answer !== undefined && Number.isInteger(answer) && answer >= 0 && answer < 3;
}
