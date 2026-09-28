import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ui } from "@/constants/ui";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={ui.screen} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={ui.content}>
        <View style={ui.card}>
          <Text style={ui.heading}>அமைப்புகள்</Text>
          <Text style={ui.body}>மதிப்பீட்டுக் கருவியின் அமைப்புகள்</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
