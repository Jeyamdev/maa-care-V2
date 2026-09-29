import { StyleSheet } from "react-native";

export const palette = {
  background: "#FCF7F9", surface: "#FFFFFF", primary: "#A82F68",
  heading: "#392C40", text: "#493C4E", muted: "#756778", border: "#EADFE6",
  selected: "#FBEAF2", accent: "#76549A", lavender: "#EEE8F5",
  danger: "#963E47", warningBackground: "#FFF1EF", warningBorder: "#EAC9C7",
  attention: "#805C24", attentionBackground: "#FBF3E5", attentionBorder: "#EAD9B8",
  success: "#286047", successBackground: "#EDF6F0", successBorder: "#C8DFD0",
} as const;
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, section: 28 } as const;
export const radius = { small: 10, medium: 16, large: 24, pill: 99 } as const;
export const motion = { feedback: 160, transition: 200 } as const;
export const typography = {
  title: { fontSize: 26, lineHeight: 38, fontWeight: "600" as const },
  heading: { fontSize: 20, lineHeight: 30, fontWeight: "600" as const },
  question: { fontSize: 22, lineHeight: 35, fontWeight: "600" as const },
  body: { fontSize: 16, lineHeight: 27 },
  caption: { fontSize: 14, lineHeight: 23 },
  button: { fontSize: 17, lineHeight: 26, fontWeight: "600" as const },
};
export const riskAppearance = (level: string) => {
  switch (level) {
    case "Low Risk": return { color: palette.success, background: palette.successBackground, border: palette.successBorder };
    case "Moderate Risk": return { color: palette.attention, background: palette.attentionBackground, border: palette.attentionBorder };
    case "High Risk": return { color: palette.danger, background: palette.warningBackground, border: palette.warningBorder };
    default: return { color: palette.heading, background: palette.lavender, border: palette.border };
  }
};
export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.background },
  content: { width: "100%", maxWidth: 640, alignSelf: "center", padding: spacing.xl, paddingBottom: 32, gap: spacing.xl },
  card: { backgroundColor: palette.surface, padding: spacing.xl, borderRadius: radius.large, borderWidth: 1, borderColor: palette.border, gap: spacing.md },
  section: { paddingVertical: spacing.sm, gap: spacing.md },
  divider: { borderTopWidth: 1, borderTopColor: palette.border, paddingTop: spacing.xl },
  title: { ...typography.title, color: palette.heading },
  heading: { ...typography.heading, color: palette.heading },
  body: { ...typography.body, color: palette.text },
  caption: { ...typography.caption, color: palette.muted },
  button: { minHeight: 56, backgroundColor: palette.primary, borderRadius: radius.medium, paddingVertical: 14, paddingHorizontal: 18, alignItems: "center", justifyContent: "center" },
  buttonText: { ...typography.button, color: palette.surface, textAlign: "center" },
  secondaryButton: { minHeight: 56, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.border, borderRadius: radius.medium, paddingVertical: 14, paddingHorizontal: 18, alignItems: "center", justifyContent: "center" },
  secondaryText: { ...typography.button, color: palette.primary, textAlign: "center" },
  footer: { backgroundColor: palette.surface, borderTopWidth: 1, borderTopColor: palette.border },
  footerContent: { width: "100%", maxWidth: 640, alignSelf: "center", paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  warning: { backgroundColor: palette.warningBackground, borderColor: palette.warningBorder, borderLeftWidth: 3 },
  warningText: { color: palette.danger },
  link: { minHeight: 48, paddingVertical: 12, paddingHorizontal: 8, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
});
