import { useState } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppIcon from "./AppIcon";
import { palette, ui } from "@/constants/ui";

const CHANNEL_URL = "https://youtube.com/@maacareapp?si=YayFCeB1kEKiP-lo";

export default function YouTubeGuidanceCard() {
  const [failedToOpen, setFailedToOpen] = useState(false);

  const openChannel = async () => {
    setFailedToOpen(false);
    try {
      await Linking.openURL(CHANNEL_URL);
    } catch {
      setFailedToOpen(true);
    }
  };

  return (
    <View style={[ui.card, styles.card]}>
      <View style={styles.header}>
        <View style={styles.videoIcon} accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <AppIcon name="play" size={24} color={palette.accent} />
        </View>
        <View style={styles.headingGroup}>
          <Text accessibilityRole="header" style={ui.heading}>மேலதிக வழிகாட்டல்கள்</Text>
          <Text style={ui.caption}>Maa Care</Text>
        </View>
      </View>
      <Text style={ui.body}>பேறுகால உளநலம் தொடர்பான மேலதிக வழிகாட்டல்களிற்கு</Text>
      <TouchableOpacity
        accessibilityRole="link"
        accessibilityHint="யூடியூப் செயலி அல்லது உலாவியில் சேனலைத் திறக்கும்"
        style={[ui.secondaryButton, styles.channelButton]}
        onPress={openChannel}
        activeOpacity={0.8}
      >
        <View style={styles.header}><Text style={[ui.secondaryText, { flex: 1 }]}>எங்கள் யூடியூப் சேனலைப் பாருங்கள்</Text><AppIcon name="external" size={20} color={palette.primary} /></View>
      </TouchableOpacity>
      <Text style={ui.caption}>வெளிப்புற இணைப்பு • இணைய இணைப்பு தேவை</Text>
      {failedToOpen && (
        <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={[ui.caption, ui.warningText]}>
          சேனலைத் திறக்க முடியவில்லை. மீண்டும் பொத்தானைத் தொட்டு முயற்சிக்கவும்.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 16, backgroundColor: palette.lavender },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  headingGroup: { flex: 1, gap: 4 },
  videoIcon: { width: 44, height: 36, borderRadius: 10, backgroundColor: palette.surface, alignItems: "center", justifyContent: "center" },
  channelButton: { backgroundColor: palette.selected },
});
