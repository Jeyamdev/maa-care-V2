import { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import AppIcon, { IconName } from "./AppIcon";
import { motion, palette, radius, ui } from "@/constants/ui";
import { useCalmMotion } from "@/hooks/useCalmMotion";

export default function AccordionCard({ title, subtitle, icon, expanded, onToggle, safety = false, children }: PropsWithChildren<{ title: string; subtitle?: string; icon?: IconName; expanded: boolean; onToggle: () => void; safety?: boolean }>) {
  const reduced = useCalmMotion();
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    opacity.setValue(expanded && !reduced ? 0 : 1);
    const animation = Animated.timing(opacity, { toValue: 1, duration: reduced ? 0 : motion.feedback, useNativeDriver: Platform.OS !== "web" });
    animation.start();
    return () => animation.stop();
  }, [expanded, opacity, reduced]);
  return <View style={[styles.card, safety && styles.safety]}>
    <Pressable accessibilityRole="button" accessibilityLabel={title} aria-expanded={expanded} accessibilityState={{ expanded }} onPress={onToggle} style={({ pressed }) => [styles.header, pressed && { opacity: 0.7 }]}>
      {icon && <View style={[styles.icon, safety && styles.safetyIcon]}><AppIcon name={icon} color={safety ? palette.attention : palette.accent} /></View>}
      <View style={styles.label}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text numberOfLines={expanded ? undefined : 2} style={ui.caption}>{subtitle}</Text>}
      </View>
      <View style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}><AppIcon name="chevron" size={20} /></View>
    </Pressable>
    {expanded && <Animated.View style={[styles.content, { opacity }]}>{children}</Animated.View>}
  </View>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.border, borderRadius: radius.medium, overflow: "hidden" },
  safety: { backgroundColor: palette.attentionBackground, borderColor: palette.attentionBorder },
  header: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12, minHeight: 72 },
  icon: { padding: 9, borderRadius: 12, backgroundColor: palette.lavender },
  safetyIcon: { backgroundColor: palette.surface },
  label: { flex: 1, gap: 4 },
  title: { ...ui.body, color: palette.heading, fontSize: 18, fontWeight: "600" },
  content: { padding: 16, paddingTop: 4, gap: 14 },
});
