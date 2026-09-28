import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AssessmentSummary from "@/components/AssessmentSummary";
import { questions } from "@/constants/questions";
import { palette, ui } from "@/constants/ui";
import { AssessmentRecord } from "@/services/storageService";

export default function AssessmentDetailScreen() {
  const params = useLocalSearchParams<{ assessment?: string }>();
  const router = useRouter();
  const assessment = useMemo<AssessmentRecord | null>(() => {
    try {
      const parsed = JSON.parse(params.assessment ?? "null");
      return parsed && typeof parsed.score === "number" && typeof parsed.riskLevel === "string" &&
        typeof parsed.createdAt === "string" && Array.isArray(parsed.answers) ? parsed : null;
    } catch { return null; }
  }, [params.assessment]);

  if (!assessment) {
    return (
      <SafeAreaView style={ui.screen} edges={["bottom", "left", "right"]}>
        <View style={ui.content}>
          <Text style={ui.body}>மதிப்பீட்டுத் தகவல்கள் எதுவும் கிடைக்கவில்லை.</Text>
          <TouchableOpacity accessibilityRole="button" style={ui.secondaryButton} onPress={() => router.replace("/history")}>
            <Text style={ui.secondaryText}>வரலாற்றைப் பார்</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ui.screen} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={ui.content}>
        <AssessmentSummary compact score={assessment.score} riskLevel={assessment.riskLevel} date={assessment.createdAt} />
        {assessment.safetyAlert && (
          <View style={[ui.card, ui.warning]}>
            <Text accessibilityRole="header" style={[ui.heading, ui.warningText]}>⚠ பாதுகாப்பு எச்சரிக்கை</Text>
            <Text style={[ui.body, ui.warningText]}>
              10ஆம் கேள்விக்கான பதில், உங்களை நீங்களே காயப்படுத்திக்கொள்ளும் எண்ணங்கள் இருக்கக்கூடும் என்பதைக் குறிக்கிறது.
              ஒரு சுகாதார நிபுணரின் உதவியைப் பெறுவது வலியுறுத்தப்படுகிறது.
            </Text>
          </View>
        )}
        <Text accessibilityRole="header" style={ui.heading}>ஒவ்வொரு கேள்வியின் விவரம்</Text>
        {questions.map((question, index) => {
          const answer = assessment.answers[index];
          const answered = Number.isInteger(answer) && answer >= 0 && answer < question.options.length;
          const score = answered ? (question.reverseScore ? answer : 3 - answer) : null;
          return (
            <View key={question.id} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <Text accessibilityRole="header" style={ui.heading}>கேள்வி {index + 1}</Text>
                <Text style={styles.score}>மதிப்பெண்: {score === null ? "—" : `${score} / 3`}</Text>
              </View>
              <Text style={ui.body}>{question.question}</Text>
              <View style={styles.answer}>
                <Text style={styles.answerLabel}>உங்கள் பதில்</Text>
                <Text style={ui.body}>{answered ? question.options[answer] : "பதிலளிக்கப்படவில்லை"}</Text>
              </View>
            </View>
          );
        })}
        <View style={ui.card}>
          <Text accessibilityRole="header" style={ui.heading}>முக்கிய அறிவிப்பு</Text>
          <Text style={ui.body}>
            இந்த மதிப்பீட்டுக் கருவி ஆரம்பப் பரிசோதனைக்கானது; இது மருத்துவ நோயறிதல் அல்ல.
            முறையான மதிப்பீடு மற்றும் உதவிக்கு தகுதிபெற்ற சுகாதார நிபுணரை அணுகவும்.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  questionCard: { backgroundColor: palette.surface, borderRadius: 16, borderWidth: 1, borderColor: palette.border, padding: 16, gap: 12 },
  questionHeader: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", columnGap: 12, rowGap: 6 },
  answer: { padding: 12, gap: 6, borderRadius: 12, backgroundColor: palette.selected },
  answerLabel: { ...ui.caption, color: palette.heading, fontWeight: "600" },
  score: { fontSize: 14, lineHeight: 24, color: palette.text, fontWeight: "600" },
});
