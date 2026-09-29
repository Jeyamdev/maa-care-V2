import { StyleSheet, Text, View } from "react-native";
import { palette, radius, ui } from "@/constants/ui";
import StatusBadge from "./StatusBadge";

export default function AssessmentSummary({ score, riskLevel, date, compact = false }: { score: number; riskLevel: string; date?: string; compact?: boolean }) {
  return <View style={[styles.summary, compact && styles.compact]}>
    <Text style={ui.caption}>மொத்த மதிப்பெண்</Text>
    <View style={styles.scoreRow}><Text style={[styles.score, compact && { fontSize: 36, lineHeight: 48 }]}>{score}</Text><Text style={styles.total}>/ 30</Text></View>
    <StatusBadge level={riskLevel} />
    {!compact && <Text style={ui.caption}>ஆரம்பப் பரிசோதனை • மருத்துவ நோயறிதல் அல்ல</Text>}
    {date && <Text style={ui.caption}>{new Date(date).toLocaleString("ta-LK")}</Text>}
  </View>;
}
const styles = StyleSheet.create({
  summary: { backgroundColor: palette.lavender, borderRadius: radius.large, padding: 24, gap: 12, borderWidth: 1, borderColor: palette.border },
  compact: { padding: 18, gap: 8 },
  scoreRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  score: { fontSize: 64, lineHeight: 76, fontWeight: "600", color: palette.heading },
  total: { fontSize: 22, color: palette.muted },
});
