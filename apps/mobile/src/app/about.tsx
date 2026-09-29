import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SectionHeader from "@/components/SectionHeader";
import { ui } from "@/constants/ui";
import YouTubeGuidanceCard from "@/components/YouTubeGuidanceCard";

export default function AboutScreen() {
  return (
    <SafeAreaView style={ui.screen} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={ui.content}>
        <View style={ui.row}><Image source={require("../../assets/images/logo.png")} style={{ width: 48, height: 48 }} resizeMode="contain" /><Text style={ui.title}>Maa Care</Text></View>
        <View style={ui.section}>
          <SectionHeader title="மதிப்பீட்டுக் கருவி பற்றி" icon="book" />
          <Text style={ui.body}>
            எடின்பர்க் பிரசவத்திற்குப் பிந்தைய மனச்சோர்வு அளவுகோல் என்பது, பிரசவத்திற்குப் பிந்தைய மனச்சோர்வு இருக்கக்கூடிய பெண்களைக் கண்டறிய உருவாக்கப்பட்ட 10 கேள்விகள் கொண்ட ஒரு மதிப்பீட்டுக் கருவியாகும்.
          </Text>
        </View>
        <View style={[ui.section, ui.divider]}>
          <SectionHeader title="முக்கிய அறிவிப்பு" icon="shield" />
          <Text style={ui.body}>
            இந்தக் கருவி பரிசோதனை நோக்கங்களுக்காக மட்டுமேயானது, மேலும் இது தொழில்முறை மருத்துவ ஆலோசனை, நோயறிதல் அல்லது சிகிச்சைக்கு மாற்றாகக் கருதப்படக்கூடாது.
          </Text>
        </View>

        <YouTubeGuidanceCard />

        <View style={ui.section}>
          <SectionHeader title="மேற்கோள்" icon="book" />
          <Text style={ui.caption}>
            Cox, J.L., Holden, J.M., & Sagovsky, R. (1987). Detection of postnatal depression.
            Development of the 10-item Edinburgh Postnatal Depression Scale. British Journal of
            Psychiatry, 150, 782-786.
          </Text>
          <Text style={ui.caption}>
            © 1987 The Royal College of Psychiatrists.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
