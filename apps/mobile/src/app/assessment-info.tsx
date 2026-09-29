import { palette, ui } from "@/constants/ui";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccordionCard from "@/components/AccordionCard";

const steps = [
  "இன்று மட்டும் அல்லாமல், கடந்த 7 நாட்களில் நீங்கள் எப்படி உணர்ந்தீர்கள் என்பதை நினைத்துப் பதிலளிக்கவும்.",
  "4 பதில்களில் உங்கள் உணர்வுகளுக்கு மிக நெருக்கமான ஒன்றைத் தேர்ந்தெடுக்கவும். சரியான அல்லது தவறான பதில் என்று எதுவும் இல்லை.",
  "எல்லா 10 கேள்விகளுக்கும் பதிலளித்து, முடி பொத்தானை அழுத்தவும். அதற்கு முன் முந்தைய கேள்விக்குச் சென்று பதிலை மாற்றலாம்.",
];
export default function AssessmentInfoScreen() {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(0);
  const toggle = (index: number) => setOpen(current => current === index ? null : index);
  return <SafeAreaView style={ui.screen} edges={["left", "right"]}>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={ui.content}>
      <View style={ui.section}>
        <Text accessibilityRole="header" style={ui.title}>மதிப்பீட்டைத் தொடங்கும் முன்</Text>
        <Text style={ui.body}>உங்கள் உணர்வுகளை அறிந்துகொள்ள ஒரு சிறிய படி. பிரசவத்திற்குப் பிந்தைய மனச்சோர்வின் அறிகுறிகளை அறிய இந்த மதிப்பீடு உதவுகிறது.</Text>
      </View>
      <AccordionCard title="எப்படிப் பதிலளிப்பது?" icon="edit" expanded={open === 0} onToggle={() => toggle(0)}>
        {steps.map((step, index) => <View key={step} style={styles.step}><View style={styles.number}><Text style={styles.numberText}>{index + 1}</Text></View><Text style={[ui.body, { flex: 1 }]}>{step}</Text></View>)}
      </AccordionCard>
      <AccordionCard title="மதிப்பெண் விவரம்" icon="chart" expanded={open === 1} onToggle={() => toggle(1)}>
        <Text style={ui.body}>10 கேள்விகளுக்கான உங்கள் பதில்களின் அடிப்படையில், மொத்த மதிப்பெண் 0 முதல் 30 வரை கணக்கிடப்படும். இந்தச் செயலி தானாகக் கணக்கிடும்.</Text>
        <Text style={ui.body}>இந்த மதிப்பெண் ஆரம்பப் பரிசோதனைக்கான வழிகாட்டுதல் மட்டுமே. மதிப்பெண் மட்டும் நோயறிதலை உறுதிப்படுத்தாது.</Text>
      </AccordionCard>
      <AccordionCard title="முக்கிய பாதுகாப்புத் தகவல்" icon="shield" safety expanded={open === 2} onToggle={() => toggle(2)}>
        <Text style={ui.body}>உங்களை நீங்களே காயப்படுத்திக்கொள்ளும் எண்ணங்கள் பற்றிய 10ஆம் கேள்வியில், ஒருபோதும் இல்லை என்பதைத் தவிர வேறு பதிலைத் தேர்ந்தெடுத்தால், மொத்த மதிப்பெண் எவ்வளவாக இருந்தாலும் உதவியை நாடுவது அவசியம்.</Text>
        <Text style={ui.body}>உடனடியாக உங்கள் மருத்துவர், பேறுகாலப் பணிப்பெண் அல்லது நம்பகமான ஆதரவாளரைத் தொடர்புகொள்ளவும்.</Text>
        <Text style={ui.body}>எடின்பர்க் பிரசவத்திற்குப் பிந்தைய மனச்சோர்வு அளவுகோல் ஓர் ஆரம்பப் பரிசோதனைக் கருவி. இது மருத்துவ நோயறிதல் அல்ல; மருத்துவ ஆலோசனை அல்லது சிகிச்சைக்கு மாற்றாகாது. முறையான மதிப்பீடு மற்றும் உதவிக்கு தகுதிபெற்ற சுகாதார நிபுணரை அணுகவும்.</Text>
      </AccordionCard>
      <Text style={ui.caption}>இது மருத்துவ நோயறிதல் அல்ல; மருத்துவ ஆலோசனை அல்லது சிகிச்சைக்கு மாற்றாகாது.</Text>
    </ScrollView>
    <SafeAreaView style={ui.footer} edges={["bottom"]}><View style={ui.footerContent}><TouchableOpacity style={ui.button} accessibilityRole="button" onPress={() => router.push("/assessment")} activeOpacity={0.8}><Text style={ui.buttonText}>மதிப்பீட்டைத் தொடங்கு</Text></TouchableOpacity></View></SafeAreaView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  step: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  number: { width: 28, minHeight: 28, borderRadius: 14, backgroundColor: palette.lavender, alignItems: "center", justifyContent: "center" },
  numberText: { ...ui.caption, color: palette.accent, fontWeight: "600" },
});
