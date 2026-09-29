import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppIcon from "@/components/AppIcon";
import StatusBadge from "@/components/StatusBadge";
import { palette, ui } from "@/constants/ui";
import { AssessmentRecord, clearAssessmentHistory, deleteAssessment, getAssessmentHistory } from "@/services/storageService";

export default function HistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<AssessmentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    const data = await getAssessmentHistory();
    setHistory(data);
    setLoading(false);
  }, []);

  useFocusEffect(useCallback(() => { void loadHistory(); }, [loadHistory]));

  const remove = (id?: string) => {
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
              <TouchableOpacity accessibilityRole="button" accessibilityLabel="அனைத்து மதிப்பீடுகளையும் நீக்கு" style={styles.clearAction} onPress={() => remove()}>
                <Text style={styles.clearText}>அனைத்தையும் நீக்கு</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          renderItem={({ item }) => {
            const date = new Date(item.createdAt).toLocaleString("ta-LK");
            return (
              <View style={styles.card}>
                <TouchableOpacity
                  accessibilityRole="button"
                  style={styles.details}
                  onPress={() => router.push({ pathname: "/assessment-detail", params: { assessment: JSON.stringify(item) } })}
                  activeOpacity={0.85}
                >
                  <View style={styles.dateRow}><View style={styles.dot} /><Text style={[styles.date, { flex: 1 }]}>{date}</Text></View>
                  <View style={styles.summary}>
                    <Text style={styles.score}>மதிப்பெண்: {item.score}/30</Text>
                    <StatusBadge level={item.riskLevel} />
                </View>
                  {item.safetyAlert && <Text style={[ui.caption, ui.warningText]}>⚠ பாதுகாப்பு எச்சரிக்கை உள்ளது</Text>}
                </TouchableOpacity>
                <View style={styles.cardFooter}>
                  <TouchableOpacity accessibilityRole="button" style={styles.viewAction} onPress={() => router.push({ pathname: "/assessment-detail", params: { assessment: JSON.stringify(item) } })}>
                    <Text style={ui.caption}>விவரங்களைப் பார் →</Text>
                  </TouchableOpacity>
                  <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${date} மதிப்பீட்டை நீக்கு`} style={styles.deleteAction} onPress={() => remove(item.id)}>
                    <AppIcon name="trash" size={19} color={palette.muted} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <View style={styles.emptyIcon}><AppIcon name="history" size={40} /></View>
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
  clearAction: { maxWidth: "100%", minHeight: 48, paddingVertical: 12, paddingHorizontal: 4, justifyContent: "center", marginLeft: "auto" },
  clearText: { fontSize: 14, lineHeight: 24, fontWeight: "600", color: palette.danger, textAlign: "right" },
  card: { borderLeftWidth: 2, borderLeftColor: palette.border, marginLeft: 5, paddingLeft: 14, paddingBottom: 12 },
  details: { paddingRight: 4, gap: 10 },
  summary: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 10 },
  date: { fontSize: 15, lineHeight: 24, fontWeight: "600", color: palette.heading },
  score: { fontSize: 16, fontWeight: "600", color: palette.text },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 12 },
  viewAction: { flex: 1, minHeight: 48, justifyContent: "center" },
  deleteAction: { minHeight: 48, minWidth: 48, alignItems: "center", justifyContent: "center" },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.accent },
  empty: { paddingVertical: 36, gap: 20 },
  emptyIcon: { width: 88, height: 88, borderRadius: 30, backgroundColor: palette.lavender, alignItems: "center", justifyContent: "center" },
});
