import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { riskLevelInTamil } from "@/constants/localization";
import { palette, riskAppearance, ui } from "@/constants/ui";
import { AssessmentRecord, clearAssessmentHistory, deleteAssessment, getAssessmentHistory } from "@/services/storageService";

export default function HistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<AssessmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadHistory = useCallback(async () => {
    const data = await getAssessmentHistory();
    setHistory(data);
    setLoading(false);
  }, []);

  useFocusEffect(useCallback(() => { void loadHistory(); }, [loadHistory]));

  const remove = (id?: string) => {
    setMenuOpen(false);
    Alert.alert(id ? "மதிப்பீட்டை நீக்கு" : "வரலாற்றை நீக்கு", id ? "இந்த மதிப்பீட்டை நீக்க விரும்புகிறீர்களா?" : "அனைத்து மதிப்பீடுகளையும் நீக்க விரும்புகிறீர்களா?", [
      { text: "ரத்து செய்", style: "cancel" },
      {
        text: id ? "நீக்கு" : "அனைத்தையும் நீக்கு", style: "destructive",
        onPress: async () => {
          const success = id ? await deleteAssessment(id) : await clearAssessmentHistory();
          if (success) await loadHistory();
          else Alert.alert("நீக்க முடியவில்லை", "மீண்டும் முயற்சிக்கவும்.", [{ text: "சரி" }]);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={ui.screen} edges={["bottom", "left", "right"]}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={palette.primary} />
          <Text accessibilityLiveRegion="polite" style={ui.body}>வரலாறு ஏற்றப்படுகிறது…</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          contentContainerStyle={ui.content}
          ListHeaderComponent={history.length > 0 ? (
            <View style={styles.toolbar}>
              <Text style={ui.caption}>மதிப்பீடுகள்: {history.length}</Text>
              <TouchableOpacity accessibilityRole="button" accessibilityState={{ expanded: menuOpen }} style={ui.link} onPress={() => setMenuOpen((open) => !open)}>
                <Text style={ui.secondaryText}>மேலும் {menuOpen ? "−" : "+"}</Text>
              </TouchableOpacity>
              {menuOpen && (
                <TouchableOpacity accessibilityRole="button" style={styles.clearAction} onPress={() => remove()}>
                  <Text style={[ui.secondaryText, ui.warningText]}>முழு வரலாற்றையும் நீக்கு</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
          renderItem={({ item }) => {
            const appearance = riskAppearance(item.riskLevel);
            const date = new Date(item.createdAt).toLocaleString("ta-LK");
            return (
              <View style={styles.card}>
                <TouchableOpacity
                  accessibilityRole="button"
                  style={styles.details}
                  onPress={() => router.push({ pathname: "/assessment-detail", params: { assessment: JSON.stringify(item) } })}
                  activeOpacity={0.85}
                >
                  <Text style={ui.heading}>{date}</Text>
                  <View style={styles.summary}>
                    <Text style={styles.score}>மதிப்பெண்: {item.score}/30</Text>
                    <View style={[styles.badge, { backgroundColor: appearance.background, borderColor: appearance.border }]}>
                      <Text style={[styles.risk, { color: appearance.color }]}>{riskLevelInTamil(item.riskLevel)}</Text>
                    </View>
                  </View>
                  {item.safetyAlert && <Text style={[ui.caption, ui.warningText]}>⚠ பாதுகாப்பு எச்சரிக்கை உள்ளது</Text>}
                  <Text style={ui.caption}>விவரங்களைப் பார் →</Text>
                </TouchableOpacity>
                <View style={styles.cardFooter}>
                  <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${date} மதிப்பீட்டை நீக்கு`} style={styles.deleteAction} onPress={() => remove(item.id)}>
                    <Text style={[ui.secondaryText, ui.warningText]}>நீக்கு</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={ui.card}>
              <Text accessibilityRole="header" style={ui.heading}>இதுவரை மதிப்பீடுகள் இல்லை</Text>
              <Text style={ui.body}>உங்கள் முதல் மதிப்பீட்டை நிறைவு செய்ததும், அதன் முடிவு இங்கே காட்டப்படும்.</Text>
              <TouchableOpacity accessibilityRole="button" style={ui.button} onPress={() => router.push("/assessment-info")}>
                <Text style={ui.buttonText}>மதிப்பீட்டைத் தொடங்கு</Text>
              </TouchableOpacity>
            </View>
          }
          ListFooterComponent={history.length > 0 ? (
            <TouchableOpacity accessibilityRole="button" style={ui.secondaryButton} onPress={() => router.push("/assessment-info")}>
              <Text style={ui.secondaryText}>புதிய மதிப்பீட்டைத் தொடங்கு</Text>
            </TouchableOpacity>
          ) : null}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14, padding: 20 },
  toolbar: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 },
  clearAction: { width: "100%", minHeight: 48, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: palette.border, backgroundColor: palette.surface },
  card: { backgroundColor: palette.surface, borderRadius: 20, borderWidth: 1, borderColor: palette.border },
  details: { padding: 18, gap: 12 },
  summary: { alignItems: "flex-start", gap: 10 },
  score: { fontSize: 18, fontWeight: "600", color: palette.text },
  badge: { maxWidth: "100%", borderRadius: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6 },
  risk: { fontSize: 14, fontWeight: "600", lineHeight: 24 },
  cardFooter: { borderTopWidth: 1, borderTopColor: palette.border, alignItems: "flex-end", paddingHorizontal: 8 },
  deleteAction: { minHeight: 48, minWidth: 64, padding: 12, justifyContent: "center" },
});
