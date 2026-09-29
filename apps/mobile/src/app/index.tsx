import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import HeroArtwork from "@/components/HeroArtwork";
import AppHeader from "@/components/AppHeader";
import AppIcon from "@/components/AppIcon";
import { palette, radius, ui } from "@/constants/ui";

export default function HomeScreen() {
  const router = useRouter();
  const { height, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const compact = height - insets.top - insets.bottom < 740 || fontScale > 1.2;
  return <SafeAreaView style={ui.screen}>
    <AppHeader onAboutPress={() => router.push("/about")} onSettingsPress={() => router.push("/settings")} />
    <ScrollView contentContainerStyle={[styles.content, compact && styles.compact]}>
      <HeroArtwork compact={compact} />
      <View style={styles.hero}>
        <Text accessibilityRole="header" style={styles.title}>EPDS Calculator</Text>
        <Text style={styles.description}>பிரசவத்திற்குப் பிந்தைய மனச்சோர்வின் சாத்தியமான அறிகுறிகளை அறிய இந்த மதிப்பீடு உதவுகிறது.</Text>
      </View>
      <View style={styles.chips}>
        <View style={styles.chip}><AppIcon name="list" size={16} /><Text style={styles.chipText}>10 கேள்விகள்</Text></View>
        <View style={styles.chip}><AppIcon name="shield" size={16} /><Text style={styles.chipText}>இணையம் தேவையில்லை</Text></View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity accessibilityRole="button" style={ui.button} onPress={() => router.push("/assessment-info")} activeOpacity={0.8}><Text style={ui.buttonText}>மதிப்பீட்டைத் தொடங்கு</Text></TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={[ui.secondaryButton, ui.row]} onPress={() => router.push("/history")} activeOpacity={0.8}><AppIcon name="history" color={palette.primary} /><Text style={ui.secondaryText}>வரலாற்றைப் பார்</Text></TouchableOpacity>
      </View>
      <View style={styles.notice}>
        <AppIcon name="info" size={20} />
        <View style={styles.noticeCopy}><Text style={styles.noticeTitle}>முக்கிய அறிவிப்பு</Text><Text style={ui.caption}>இது ஓர் ஆரம்பப் பரிசோதனை மட்டுமே; மருத்துவ ஆலோசனை, நோயறிதல் அல்லது சிகிச்சைக்கு மாற்றல்ல.</Text></View>
      </View>
      <Text style={styles.reference}>© 1987 The Royal College of Psychiatrists. Cox, J.L., Holden, J.M., & Sagovsky, R. (1987). Detection of postnatal depression. Development of the 10-item Edinburgh Postnatal Depression Scale. British Journal of Psychiatry, 150, 782-786.</Text>
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 600, alignSelf: "center", paddingHorizontal: 20, paddingTop: 4, paddingBottom: 20, gap: 14 },
  compact: { gap: 10, paddingHorizontal: 16 },
  hero: { gap: 6 },
  title: { ...ui.title, textAlign: "center" },
  description: { ...ui.body, textAlign: "center" },
  chips: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  chip: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: palette.lavender, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 5 },
  chipText: { ...ui.caption, fontSize: 12, color: palette.heading },
  actions: { gap: 10 },
  notice: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingTop: 6 },
  noticeCopy: { flex: 1, gap: 4 },
  noticeTitle: { ...ui.caption, color: palette.heading, fontWeight: "600" },
  reference: { fontSize: 11, lineHeight: 17, color: palette.muted, borderTopWidth: 1, borderTopColor: palette.border, paddingTop: 10 },
});
