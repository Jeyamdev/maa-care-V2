import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AppHeader from "@/components/AppHeader";
import { palette, ui } from "@/constants/ui";

export default function HomeScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const compact = height - insets.top - insets.bottom < 720;

  return (
    <SafeAreaView style={ui.screen}>
      <AppHeader compact onAboutPress={() => router.push("/about")} />
      <View style={[styles.content, compact && styles.compactContent]}>
        <View style={styles.hero}>
          <Text accessibilityRole="header" style={[styles.title, compact && styles.compactTitle]}>EPDS Calculator</Text>
          <Text style={[styles.description, compact && styles.compactBody]}>
            பிரசவத்திற்குப் பிந்தைய மனச்சோர்வின் சாத்தியமான அறிகுறிகளை அறிய இந்த மதிப்பீடு உதவுகிறது.
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity accessibilityRole="button" style={[ui.button, styles.button, compact && styles.compactButton]} onPress={() => router.push("/assessment-info")} activeOpacity={0.85}>
            <Text style={[ui.buttonText, compact && styles.compactButtonText]}>மதிப்பீட்டைத் தொடங்கு</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" style={[ui.secondaryButton, styles.button, compact && styles.compactButton]} onPress={() => router.push("/history")} activeOpacity={0.85}>
            <Text style={[ui.secondaryText, compact && styles.compactButtonText]}>வரலாற்றைப் பார்</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.notice, compact && styles.compactNotice]}>
          <Text accessibilityRole="header" style={styles.noticeTitle}>முக்கிய அறிவிப்பு</Text>
          <Text style={[styles.noticeText, compact && styles.compactBody]}>
            இது ஓர் ஆரம்பப் பரிசோதனை மட்டுமே; மருத்துவ ஆலோசனை, நோயறிதல் அல்லது சிகிச்சைக்கு மாற்றல்ல.
          </Text>
        </View>
        <View style={styles.reference}>
          <Text style={[styles.referenceText, compact && styles.compactReference]}>
            © 1987 The Royal College of Psychiatrists. Cox, J.L., Holden, J.M., & Sagovsky, R.
            (1987). Detection of postnatal depression. Development of the 10-item Edinburgh
            Postnatal Depression Scale. British Journal of Psychiatry, 150, 782-786.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, width: "100%", maxWidth: 640, alignSelf: "center", padding: 20, gap: 16, justifyContent: "space-evenly" },
  compactContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  hero: { gap: 10 },
  title: { fontSize: 28, fontWeight: "bold", color: palette.heading, textAlign: "center" },
  compactTitle: { fontSize: 24 },
  description: { fontSize: 16, lineHeight: 26, color: palette.text, textAlign: "center" },
  actions: { gap: 10 },
  button: { minHeight: 52, paddingVertical: 12 },
  compactButton: { minHeight: 48, paddingVertical: 10 },
  compactButtonText: { fontSize: 16 },
  notice: { backgroundColor: palette.surface, borderRadius: 16, padding: 16, gap: 6, borderWidth: 1, borderColor: palette.border },
  compactNotice: { padding: 12 },
  noticeTitle: { fontSize: 16, fontWeight: "bold", color: palette.heading },
  noticeText: { fontSize: 15, lineHeight: 24, color: palette.text },
  compactBody: { fontSize: 14, lineHeight: 22 },
  reference: { borderTopWidth: 1, borderTopColor: palette.border, paddingTop: 10 },
  referenceText: { fontSize: 12, lineHeight: 18, color: palette.muted },
  compactReference: { fontSize: 11, lineHeight: 16 },
});
