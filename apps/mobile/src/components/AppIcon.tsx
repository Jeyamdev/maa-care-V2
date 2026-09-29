import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { palette } from "@/constants/ui";

const names = {
  settings: { ios: "gearshape", android: "settings", web: "settings" },
  book: { ios: "book", android: "menu_book", web: "menu_book" },
  list: { ios: "checklist", android: "checklist", web: "checklist" },
  shield: { ios: "checkmark.shield", android: "verified_user", web: "verified_user" },
  history: { ios: "clock.arrow.circlepath", android: "history", web: "history" },
  chart: { ios: "chart.bar", android: "bar_chart", web: "bar_chart" },
  info: { ios: "info.circle", android: "info", web: "info" },
  chevron: { ios: "chevron.down", android: "expand_more", web: "expand_more" },
  next: { ios: "chevron.right", android: "chevron_right", web: "chevron_right" },
  external: { ios: "arrow.up.right.square", android: "open_in_new", web: "open_in_new" },
  trash: { ios: "trash", android: "delete", web: "delete" },
  play: { ios: "play.rectangle", android: "smart_display", web: "smart_display" },
  edit: { ios: "square.and.pencil", android: "edit_note", web: "edit_note" },
  check: { ios: "checkmark", android: "check", web: "check" },
  time: { ios: "clock", android: "schedule", web: "schedule" },
} as const;
export type IconName = keyof typeof names;
export default function AppIcon({ name, size = 22, color = palette.accent }: { name: IconName; size?: number; color?: string }) {
  return <View accessible={false} aria-hidden accessibilityElementsHidden importantForAccessibility="no-hide-descendants"><SymbolView name={names[name]} size={size} tintColor={color} /></View>;
}
