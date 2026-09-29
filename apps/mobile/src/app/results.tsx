import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SectionHeader from "@/components/SectionHeader";
import AssessmentSummary from "@/components/AssessmentSummary";
import YouTubeGuidanceCard from "@/components/YouTubeGuidanceCard";
import { isValidAnswers, calculateTotal, classifyRisk, interpretation, hasSafetyAlert } from "@maa-care/epds-core";
import { ui } from "@/constants/ui";
import { saveAssessment } from "@/services/storageService";

export default function ResultScreen() {
  const params = useLocalSearchParams<{ answers?: string }>();
  const router = useRouter();
  const [createdAt] = useState(() => new Date().toISOString());
  const answers = useMemo<number[] | null>(() => {
    try {
      const parsed: unknown = JSON.parse(params.answers ?? "null");
      return isValidAnswers(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }, [params.answers]);

  const totalScore = answers ? calculateTotal(answers) : 0;
  const riskLevel = classifyRisk(totalScore);
  const message = interpretation(totalScore);
  const showSafetyAlert = hasSafetyAlert(answers);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "error">("saving");
  const saving = useRef(false);
  const saved = useRef(false);

  const persist = useCallback(async () => {
    if (!answers || saving.current || saved.current) return;
    saving.current = true;
    setSaveStatus("saving");
    try {
      const success = await saveAssessment({
        id: createdAt,
        createdAt,
        score: totalScore,
        riskLevel,
        safetyAlert: showSafetyAlert,
        answers,
      });
      saved.current = success;
      setSaveStatus(success ? "saved" : "error");
    } catch {
      setSaveStatus("error");
    } finally {
      saving.current = false;
    }
  }, [answers, createdAt, totalScore, riskLevel, showSafetyAlert]);

  useEffect(() => { void persist(); }, [persist]);

  if (!answers) {
    return (
      <SafeAreaView style={ui.screen} edges={["bottom", "left", "right"]}>
        <ScrollView contentContainerStyle={ui.content}>
          <View style={ui.section}>
            <Text style={ui.heading}>முழுமையான பதில்கள் தேவை</Text>
            <Text style={ui.body}>முடிவைப் பார்க்க அனைத்துக் கேள்விகளுக்கும் பதிலளிக்கவும்.</Text>
            <TouchableOpacity accessibilityRole="button" style={ui.button} onPress={() => router.replace("/assessment-info")}>
              <Text style={ui.buttonText}>மதிப்பீட்டைத் தொடங்கு</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ui.screen} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={ui.content}>
        <AssessmentSummary score={totalScore} riskLevel={riskLevel} />
        {showSafetyAlert && (
          <View style={[ui.card, ui.warning]} accessibilityRole="alert">
            <Text accessibilityRole="header" style={[ui.heading, ui.warningText]}>உதவி பெறுவதற்கான முக்கிய பரிந்துரை</Text>
            <Text style={[ui.body, ui.warningText]}>
              10ஆம் கேள்விக்கான உங்கள் பதில், உங்களை நீங்களே காயப்படுத்திக்கொள்ளும் எண்ணங்கள் இருக்கக்கூடும் என்பதைக் குறிக்கிறது.
              உடனடியாக ஒரு சுகாதார நிபுணரையோ நம்பகமான ஆதரவாளரையோ தொடர்புகொள்ளவும்.
            </Text>
          </View>
        )}
        <View style={ui.section}>
          <SectionHeader title="உங்கள் முடிவின் பொருள்" icon="chart" />
          <Text style={ui.body}>{message}</Text>
        </View>
        {totalScore > 9 ? (
          <View style={ui.section}>
            <SectionHeader title="உதவியை நாடுங்கள்" icon="shield" />
            <Text style={ui.body}>
              நீங்கள் அதிக அல்லது நடுத்தர ஆபத்து நிலையில் இருந்தால், உடனடியாக உங்கள் குடும்ப அங்கத்தவர்கள்,
              உங்கள் பேறுகாலப் பணிப்பெண் (மிட்வைஃப்) அல்லது உங்கள் மருத்துவரின் உதவியை நாடுங்கள்.
            </Text>
          </View>
        ) : (
          <View style={ui.section}>
            <SectionHeader title="அடுத்து என்ன செய்யலாம்?" icon="shield" />
            <Text style={ui.body}>கவலைகள் அல்லது சிரமங்கள் இருந்தால் உதவியை நாடவும். முறையான மதிப்பீடு மற்றும் உதவிக்கு தகுதிபெற்ற சுகாதார நிபுணரை அணுகவும்.</Text>
          </View>
        )}
        <View style={[ui.section, ui.divider]}>
          <SectionHeader title="மதிப்பீட்டுத் தகவல்கள்" icon="list" />
          <Text style={ui.body}>தேதி: {new Date(createdAt).toLocaleString("ta-LK")}</Text>
          <Text style={ui.body}>பதிலளித்த கேள்விகள்: {answers.length}</Text>
          <Text accessibilityLiveRegion="polite" style={[ui.caption, saveStatus === "error" && ui.warningText]}>
            {saveStatus === "saving" ? "முடிவு சேமிக்கப்படுகிறது…" : saveStatus === "saved" ? "முடிவு வரலாற்றில் சேமிக்கப்பட்டது." : "முடிவைச் சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்."}
          </Text>
          {saveStatus === "error" && (
            <TouchableOpacity accessibilityRole="button" style={ui.secondaryButton} onPress={() => void persist()}>
              <Text style={ui.secondaryText}>மீண்டும் சேமி</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={ui.section}>
          <SectionHeader title="முக்கிய அறிவிப்பு" icon="info" />
          <Text style={ui.body}>
            இந்த மதிப்பீட்டுக் கருவி ஆரம்பப் பரிசோதனைக்கானது; இது மருத்துவ நோயறிதலை வழங்காது.
            முறையான மதிப்பீடு மற்றும் உதவிக்கு தகுதிபெற்ற சுகாதார நிபுணரை அணுகவும்.
          </Text>
        </View>
        <TouchableOpacity accessibilityRole="button" style={ui.secondaryButton} onPress={() => router.push({ pathname: "/assessment-detail", params: { assessment: JSON.stringify({ id: createdAt, createdAt, score: totalScore, riskLevel, safetyAlert: showSafetyAlert, answers }) } })}>
          <Text style={ui.secondaryText}>பதில்களின் விவரங்களைப் பார்</Text>
        </TouchableOpacity>
        <YouTubeGuidanceCard />
        <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: saveStatus === "saving" }} disabled={saveStatus === "saving"} style={[ui.button, saveStatus === "saving" && { opacity: 0.45 }]} onPress={() => router.replace("/history")}>
          <Text style={ui.buttonText}>வரலாற்றைப் பார்</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: saveStatus === "saving" }} disabled={saveStatus === "saving"} style={[ui.secondaryButton, saveStatus === "saving" && { opacity: 0.45 }]} onPress={() => router.replace("/assessment-info")}>
          <Text style={ui.secondaryText}>புதிய மதிப்பீட்டைத் தொடங்கு</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: saveStatus === "saving" }} disabled={saveStatus === "saving"} style={[ui.link, saveStatus === "saving" && { opacity: 0.45 }]} onPress={() => router.dismissTo("/")}>
          <Text style={ui.secondaryText}>முகப்புக்குச் செல்</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
