// Keep stored risk values stable so existing assessments retain their meaning and colors.
export function riskLevelInTamil(level: string): string {
  switch (level) {
    case "Low Risk":
      return "குறைந்த ஆபத்து";
    case "Moderate Risk":
      return "மிதமான ஆபத்து";
    case "High Risk":
      return "அதிக ஆபத்து";
    default:
      return /[\u0B80-\u0BFF]/.test(level) ? level : "ஆபத்து நிலை தெரியவில்லை";
  }
}
