import { Text, View } from "react-native";
import AppIcon, { IconName } from "./AppIcon";
import { ui } from "@/constants/ui";
export default function SectionHeader({ title, icon }: { title: string; icon: IconName }) {
  return <View style={ui.row}><AppIcon name={icon} /><Text accessibilityRole="header" style={[ui.heading, { flex: 1 }]}>{title}</Text></View>;
}
