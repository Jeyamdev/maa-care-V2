import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppIcon from "@/components/AppIcon";
import { palette, ui } from "@/constants/ui";

export default function SettingsScreen() {
  const router = useRouter();
  return <SafeAreaView style={ui.screen} edges={["bottom", "left", "right"]}>
    <ScrollView contentContainerStyle={ui.content}>
      <Text style={ui.caption}>மதிப்பீட்டுக் கருவியின் அமைப்புகள்</Text>
      <View style={styles.group}>
        <View style={styles.row}><AppIcon name="book" /><View style={styles.copy}><Text style={ui.body}>மொழி</Text><Text style={ui.caption}>தமிழ்</Text></View></View>
        <View style={[styles.row, ui.divider]}><AppIcon name="shield" /><View style={styles.copy}><Text style={ui.body}>சேமிப்பு</Text><Text style={ui.caption}>மதிப்பீடுகள் இந்தச் சாதனத்தில் சேமிக்கப்படும்.</Text></View></View>
        <View style={[styles.row, ui.divider]}><AppIcon name="info" /><View style={styles.copy}><Text style={ui.body}>எழுத்தளவு மற்றும் அசைவு</Text><Text style={ui.caption}>உங்கள் சாதனத்தின் அணுகல்தன்மை அமைப்புகளைப் பின்பற்றும்.</Text></View></View>
      </View>
      <View style={styles.group}>
        <TouchableOpacity accessibilityRole="button" style={styles.row} onPress={() => router.push("/history")}><AppIcon name="history" /><Text style={[ui.body, styles.copy]}>மதிப்பீட்டு வரலாறு</Text><AppIcon name="next" /></TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={[styles.row, ui.divider]} onPress={() => router.push("/about")}><AppIcon name="book" /><Text style={[ui.body, styles.copy]}>செயலி பற்றி</Text><AppIcon name="next" /></TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({group: { borderRadius: 16, backgroundColor: palette.surface, paddingHorizontal: 16 }, row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 18, minHeight: 56 }, copy: { flex: 1, gap: 4 }});
