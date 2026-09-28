import { StyleSheet } from "react-native";

export const palette = {
  background: "#FFF5F8",
  surface: "#FFFFFF",
  primary: "#C81E70",
  heading: "#9B1F53",
  text: "#634459",
  muted: "#705368",
  border: "#F3DCE6",
  selected: "#FFF0F6",
  danger: "#9F2929",
  warningBackground: "#FFF4F3",
};

export const riskAppearance = (level: string) => {
  switch (level) {
    case "Low Risk": return { color: "#166534", background: "#F0FDF4", border: "#BBE5C9" };
    case "Moderate Risk": return { color: "#854D0E", background: "#FFFBEB", border: "#F3D99B" };
    case "High Risk": return { color: "#9F1239", background: "#FFF1F2", border: "#FECDD3" };
    default: return { color: palette.heading, background: palette.selected, border: palette.border };
  }
};

export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.background },
  content: { width: "100%", maxWidth: 640, alignSelf: "center", padding: 20, paddingBottom: 32, gap: 18 },
  card: { backgroundColor: palette.surface, padding: 18, borderRadius: 20, borderWidth: 1, borderColor: palette.border, gap: 12 },
  title: { fontSize: 26, fontWeight: "bold", color: palette.heading },
  heading: { fontSize: 18, fontWeight: "bold", color: palette.heading },
  body: { fontSize: 16, lineHeight: 27, color: palette.text },
  caption: { fontSize: 14, lineHeight: 24, color: palette.muted },
  button: { minHeight: 56, backgroundColor: palette.primary, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 18, alignItems: "center", justifyContent: "center" },
  buttonText: { fontSize: 18, fontWeight: "bold", color: palette.surface, textAlign: "center" },
  secondaryButton: { minHeight: 56, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.primary, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 18, alignItems: "center", justifyContent: "center" },
  secondaryText: { fontSize: 16, fontWeight: "600", color: palette.primary, textAlign: "center" },
  footer: { backgroundColor: palette.surface, borderTopWidth: 1, borderTopColor: palette.border },
  footerContent: { width: "100%", maxWidth: 640, alignSelf: "center", paddingHorizontal: 20, paddingVertical: 14 },
  warning: { backgroundColor: palette.warningBackground, borderColor: "#F2C6C1", borderLeftWidth: 4 },
  warningText: { color: palette.danger },
  link: { minHeight: 48, paddingVertical: 12, paddingHorizontal: 8, justifyContent: "center", alignItems: "center" },
});
