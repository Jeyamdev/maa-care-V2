import { useState } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
          <Text style={styles.playIcon}>▶</Text>
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
        <Text style={ui.secondaryText}>எங்கள் யூடியூப் சேனலைப் பாருங்கள்</Text>
      </TouchableOpacity>
      {failedToOpen && (
        <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={[ui.caption, ui.warningText]}>
          சேனலைத் திறக்க முடியவில்லை. மீண்டும் பொத்தானைத் தொட்டு முயற்சிக்கவும்.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 16 },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  headingGroup: { flex: 1, gap: 4 },
  videoIcon: { width: 44, height: 36, borderRadius: 10, backgroundColor: "#B91C1C", alignItems: "center", justifyContent: "center" },
  playIcon: { color: palette.surface, fontSize: 18, marginLeft: 2 },
  channelButton: { backgroundColor: palette.selected },
});
