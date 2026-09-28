import { palette, ui } from "@/constants/ui";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const scoreRanges = [
  {
    range: "0–9",
    label: "குறைந்த ஆபத்து",
    description: "மனச்சோர்வுக்கான வாய்ப்பு குறைவாக இருக்கலாம். கவலைகள் அல்லது சிரமங்கள் இருந்தால் உதவியை நாடவும்.",
    background: "#F0FDF4",
    border: "#BBE5C9",
    color: "#166534",
  },
  {
    range: "10–12",
    label: "மிதமான ஆபத்து",
    description: "மனச்சோர்வு அறிகுறிகள் இருக்கக்கூடும். உங்கள் பேறுகாலப் பணிப்பெண் அல்லது மருத்துவரிடம் கலந்துரையாடவும்.",
    background: "#FFFBEB",
    border: "#F3D99B",
    color: "#854D0E",
  },
  {
    range: "13–30",
    label: "அதிக ஆபத்து",
    description: "குறிப்பிடத்தக்க அறிகுறிகள் இருக்கக்கூடும். விரைவில் ஒரு சுகாதார நிபுணரின் மதிப்பீட்டையும் உதவியையும் பெறவும்.",
    background: "#FFF1F2",
    border: "#FECDD3",
    color: "#9F1239",
  },
];

export default function AssessmentInfoScreen() {
  const router = useRouter();
  const [scoringExpanded, setScoringExpanded] = useState(false);

  return (
    <SafeAreaView style={ui.screen} edges={["left", "right"]}>
      <ScrollView style={styles.scroll} contentContainerStyle={ui.content}>
        <View style={styles.hero}>
          <Text accessibilityRole="header" style={styles.title}>மதிப்பீட்டைத் தொடங்கும் முன்</Text>
          <Text style={styles.intro}>
            உங்கள் உணர்வுகளை அறிந்துகொள்ள ஒரு சிறிய படி. பிரசவத்திற்குப் பிந்தைய மனச்சோர்வின் அறிகுறிகளை அறிய இந்த மதிப்பீடு உதவுகிறது.
          </Text>
        </View>

        <View style={styles.card}>
          <Text accessibilityRole="header" style={styles.heading}>எப்படிப் பதிலளிப்பது?</Text>
          <View style={styles.steps}>
            <View style={styles.step}>
              <Text style={styles.stepNumber} accessible={false}>1</Text>
              <Text style={[styles.body, styles.stepText]}>
                இன்று மட்டும் அல்லாமல், கடந்த 7 நாட்களில் நீங்கள் எப்படி உணர்ந்தீர்கள் என்பதை நினைத்துப் பதிலளிக்கவும்.
              </Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber} accessible={false}>2</Text>
              <Text style={[styles.body, styles.stepText]}>
                4 பதில்களில் உங்கள் உணர்வுகளுக்கு மிக நெருக்கமான ஒன்றைத் தேர்ந்தெடுக்கவும். சரியான அல்லது தவறான பதில் என்று எதுவும் இல்லை.
              </Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber} accessible={false}>3</Text>
              <Text style={[styles.body, styles.stepText]}>
                எல்லாக் கேள்விகளுக்கும் பதிலளித்து, முடி பொத்தானை அழுத்தவும். அதற்கு முன் முந்தைய கேள்விக்குச் சென்று பதிலை மாற்றலாம்.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.accordion}>
          <TouchableOpacity
            style={styles.accordionButton}
            accessibilityRole="button"
            accessibilityLabel="மதிப்பெண் விவரம்"
            accessibilityState={{ expanded: scoringExpanded }}
            onPress={() => setScoringExpanded((expanded) => !expanded)}
            activeOpacity={0.75}
          >
            <View style={styles.accordionLabel}>
              <Text style={styles.accordionTitle}>மதிப்பெண் விவரம்</Text>
              <Text style={styles.caption}>
                {scoringExpanded ? "விவரங்களை மறைக்கத் தொடவும்" : "கணக்கீடும் முடிவின் பொருளும்"}
              </Text>
            </View>
            <Text style={styles.toggleIcon} accessible={false}>{scoringExpanded ? "−" : "+"}</Text>
          </TouchableOpacity>

          {scoringExpanded && (
            <View style={styles.accordionContent}>
              <Text accessibilityRole="header" style={styles.heading}>மதிப்பெண் எப்படிக் கணக்கிடப்படுகிறது?</Text>
              <Text style={styles.body}>
                ஒவ்வொரு பதிலுக்கும் 0 முதல் 3 வரை மதிப்பெண் வழங்கப்படும். கேள்வியைப் பொறுத்து பதில்களின் மதிப்பெண் வரிசை மாறும்.
              </Text>
              <Text style={styles.paragraph}>
                10 கேள்விகளின் மதிப்பெண்களைக் கூட்டினால் மொத்தம் 0 முதல் 30 வரை கிடைக்கும். இந்தச் செயலி தானாகக் கணக்கிடும்.
                ஒவ்வொரு கேள்விக்கும் 1 மதிப்பெண் கிடைத்தால், மொத்தம் 10 ஆகும்.
              </Text>
              <Text style={styles.paragraph}>அதிக மதிப்பெண், அதிகமான மனச்சோர்வு அறிகுறிகளைக் குறிக்கலாம்.</Text>
              <Text accessibilityRole="header" style={styles.rangesHeading}>இந்தச் செயலியில் முடிவின் பொருள்</Text>
              <View style={styles.ranges}>
                {scoreRanges.map((item) => (
                  <View key={item.range} style={[styles.rangeCard, { backgroundColor: item.background, borderColor: item.border }]}>
                    <View style={styles.rangeHeader}>
                      <Text style={[styles.rangeValue, { color: item.color }]}>{item.range}</Text>
                      <Text style={[styles.rangeLabel, { color: item.color }]}>{item.label}</Text>
                    </View>
                    <Text style={styles.body}>{item.description}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.paragraph}>
                இந்த வரம்புகள் இந்தச் செயலி பயன்படுத்தும் வழிகாட்டுதல்கள். மதிப்பெண் மட்டும் நோயறிதலை உறுதிப்படுத்தாது.
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.card, styles.warningCard]}>
          <Text accessibilityRole="header" style={[styles.heading, styles.warningTitle]}>முக்கிய பாதுகாப்புத் தகவல்</Text>
          <Text style={styles.body}>
            உங்களை நீங்களே காயப்படுத்திக்கொள்ளும் எண்ணங்கள் பற்றிய 10ஆம் கேள்வியில், ஒருபோதும் இல்லை என்பதைத் தவிர
            வேறு பதிலைத் தேர்ந்தெடுத்தால், மொத்த மதிப்பெண் எவ்வளவாக இருந்தாலும் உதவியை நாடுவது அவசியம்.
          </Text>
          <Text style={[styles.paragraph, styles.warningText]}>
            உடனடியாக உங்கள் மருத்துவர், பேறுகாலப் பணிப்பெண் அல்லது நம்பகமான ஆதரவாளரைத் தொடர்புகொள்ளவும்.
          </Text>
        </View>

        <View style={styles.note}>
          <Text accessibilityRole="header" style={styles.noteTitle}>நினைவில் கொள்ளுங்கள்</Text>
          <Text style={styles.caption}>
            எடின்பர்க் பிரசவத்திற்குப் பிந்தைய மனச்சோர்வு அளவுகோல் ஓர் ஆரம்பப் பரிசோதனைக் கருவி.
            இது மருத்துவ நோயறிதல் அல்ல; மருத்துவ ஆலோசனை அல்லது சிகிச்சைக்கு மாற்றாகாது.
            முறையான மதிப்பீடு மற்றும் உதவிக்கு தகுதிபெற்ற சுகாதார நிபுணரை அணுகவும்.
          </Text>
        </View>
      </ScrollView>

      <SafeAreaView style={ui.footer} edges={["bottom"]}>
        <View style={ui.footerContent}>
          <TouchableOpacity
            style={ui.button}
            accessibilityRole="button"
            onPress={() => router.push("/assessment")}
            activeOpacity={0.85}
          >
            <Text style={ui.buttonText}>மதிப்பீட்டைத் தொடங்கு</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  hero: { paddingTop: 4, gap: 14 },
  title: { fontSize: 26, fontWeight: "bold", color: palette.heading },
  intro: { fontSize: 16, lineHeight: 27, color: palette.text },
  card: { backgroundColor: palette.surface, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: palette.border },
  heading: { fontSize: 18, fontWeight: "bold", color: palette.heading, marginBottom: 14 },
  body: { fontSize: 16, lineHeight: 27, color: palette.text },
  paragraph: { fontSize: 16, lineHeight: 27, color: palette.text, marginTop: 12 },
  steps: { gap: 18 },
  step: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  stepNumber: { minWidth: 28, padding: 4, borderRadius: 8, backgroundColor: "#FFF0F6", textAlign: "center", color: palette.heading, fontSize: 15, fontWeight: "bold" },
  stepText: { flex: 1 },
  accordion: { backgroundColor: palette.surface, borderRadius: 20, borderWidth: 1, borderColor: palette.border },
  accordionButton: { flexDirection: "row", alignItems: "center", gap: 12, padding: 18, minHeight: 64 },
  accordionLabel: { flex: 1, gap: 6 },
  accordionTitle: { fontSize: 18, fontWeight: "bold", color: palette.heading },
  caption: { fontSize: 14, lineHeight: 24, color: palette.muted },
  toggleIcon: { fontSize: 28, color: palette.heading, fontWeight: "500" },
  accordionContent: { padding: 18, borderTopWidth: 1, borderTopColor: palette.border },
  rangesHeading: { fontSize: 18, fontWeight: "bold", color: palette.heading, marginTop: 24, marginBottom: 14 },
  ranges: { gap: 12 },
  rangeCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 8 },
  rangeHeader: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", columnGap: 12, rowGap: 4 },
  rangeValue: { fontSize: 22, fontWeight: "bold" },
  rangeLabel: { fontSize: 16, fontWeight: "600", flexShrink: 1 },
  warningCard: { backgroundColor: "#FFF4F3", borderColor: "#F2C6C1", borderLeftWidth: 4 },
  warningTitle: { color: "#9F2929" },
  warningText: { color: "#852828", fontWeight: "500" },
  note: { paddingHorizontal: 4, gap: 8 },
  noteTitle: { fontSize: 15, fontWeight: "600", color: palette.text },
});
