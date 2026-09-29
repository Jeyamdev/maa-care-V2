import { StyleSheet, Text, View } from "react-native";
import { riskLevelInTamil } from "@/constants/localization";
import { riskAppearance, radius, ui } from "@/constants/ui";
export default function StatusBadge({ level }: { level: string }) {
  const appearance = riskAppearance(level);
  return <View style={[styles.badge, { backgroundColor: appearance.background, borderColor: appearance.border }]}><Text style={[ui.caption, styles.text, { color: appearance.color }]}>{riskLevelInTamil(level)}</Text></View>;
}
const styles = StyleSheet.create({ badge: { alignSelf: "flex-start", maxWidth: "100%", borderRadius: radius.small, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1 }, text: { fontWeight: "600" } });
