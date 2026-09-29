import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { palette, ui } from "@/constants/ui";
import AppIcon from "./AppIcon";

export default function AppHeader({ onAboutPress, onSettingsPress }: { onAboutPress: () => void; onSettingsPress: () => void }) {
  return <View style={styles.header}>
    <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" accessible={false} />
    <Text style={styles.brand}>Maa Care</Text>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel="செயலி பற்றி" onPress={onAboutPress} style={styles.action}><AppIcon name="book" color={palette.heading} /></TouchableOpacity>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel="அமைப்புகள்" onPress={onSettingsPress} style={styles.action}><AppIcon name="settings" color={palette.heading} /></TouchableOpacity>
  </View>;
}
const styles = StyleSheet.create({
  header: { ...ui.row, paddingHorizontal: 20, paddingVertical: 4, gap: 8 },
  logo: { width: 32, height: 32 },
  brand: { fontSize: 21, fontWeight: "600", color: palette.heading, flex: 1 },
  action: { width: 48, minHeight: 48, alignItems: "center", justifyContent: "center" },
});
