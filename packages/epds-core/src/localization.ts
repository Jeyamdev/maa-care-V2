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

export function interpretation(totalScore: number): string {
  return totalScore <= 9
    ? "உங்கள் மதிப்பெண் பிரசவத்திற்குப் பிந்தைய மனச்சோர்வுக்கான வாய்ப்பு குறைவாக இருப்பதைக் குறிக்கிறது."
    : totalScore <= 12
      ? "உங்கள் மதிப்பெண் அறிகுறிகள் இருக்கக்கூடும் என்பதைக் குறிக்கிறது. இது குறித்து ஒரு சுகாதார நிபுணரிடம் கலந்துரையாடவும்."
      : "உங்கள் மதிப்பெண் குறிப்பிடத்தக்க அறிகுறிகள் இருப்பதைக் குறிக்கிறது. விரைவில் ஒரு சுகாதார நிபுணரின் உதவியை நாடவும்.";
}
