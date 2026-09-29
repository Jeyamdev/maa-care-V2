import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { motion, palette, radius, ui } from "@/constants/ui";
import { useCalmMotion } from "@/hooks/useCalmMotion";
import AppIcon from "./AppIcon";
export default function AnswerOption({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  const reduced = useCalmMotion();
  const value = useRef(new Animated.Value(selected ? 1 : 0)).current;
  useEffect(() => {
    const animation = Animated.timing(value, { toValue: selected ? 1 : 0, duration: reduced ? 0 : motion.feedback, useNativeDriver: false });
    animation.start(); return () => animation.stop();
  }, [selected, reduced, value]);
  return <Animated.View style={[styles.surface, { backgroundColor: value.interpolate({ inputRange: [0, 1], outputRange: [palette.surface, palette.selected] }), borderColor: selected ? palette.primary : palette.border }]}>
    <TouchableOpacity accessibilityRole="radio" accessibilityLabel={label} aria-checked={selected} accessibilityState={{ checked: selected }} style={styles.option} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.radio, selected && styles.selected]}>{selected && <AppIcon name="check" size={17} color={palette.surface} />}</View>
      <Text style={[ui.body, { flex: 1 }, selected && { color: palette.heading, fontWeight: "600" }]}>{label}</Text>
    </TouchableOpacity>
  </Animated.View>;
}
const styles = StyleSheet.create({ surface: { borderWidth: 1.5, borderRadius: radius.medium, overflow: "hidden" }, option: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16, minHeight: 64 }, radio: { width: 25, height: 25, borderRadius: 13, borderWidth: 1.5, borderColor: palette.muted, alignItems: "center", justifyContent: "center" }, selected: { backgroundColor: palette.primary, borderColor: palette.primary } });
