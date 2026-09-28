import { StyleSheet, Text, View } from "react-native";
import { riskLevelInTamil } from "@/constants/localization";
import { palette, riskAppearance, ui } from "@/constants/ui";

export default function AssessmentSummary({ score, riskLevel, date, compact = false }: { score: number; riskLevel: string; date?: string; compact?: boolean }) {
  const appearance = riskAppearance(riskLevel);
  return (
    <View style={[ui.card, styles.summary, compact && styles.compactSummary]}>
      <View style={compact ? styles.compactScoreRow : styles.scoreColumn}>
        <Text style={ui.heading}>மொத்த மதிப்பெண்</Text>
        <Text style={[styles.score, compact && styles.compactScore]}>{score} / 30</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: appearance.background, borderColor: appearance.border }]}>
        <Text style={[styles.risk, { color: appearance.color }]}>{riskLevelInTamil(riskLevel)}</Text>
      </View>
      {date && <Text style={ui.caption}>{new Date(date).toLocaleString("ta-LK")}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { alignItems: "center", paddingVertical: 24 },
  scoreColumn: { alignItems: "center", gap: 12 },
  compactSummary: { paddingVertical: 16, gap: 10 },
  compactScoreRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", columnGap: 16, rowGap: 6 },
  compactScore: { fontSize: 30 },
  score: { fontSize: 44, fontWeight: "bold", color: palette.text, textAlign: "center" },
  badge: { maxWidth: "100%", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1 },
  risk: { fontSize: 18, fontWeight: "600", textAlign: "center" },
});
