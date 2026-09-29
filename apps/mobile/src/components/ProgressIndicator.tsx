import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useCalmMotion } from "@/hooks/useCalmMotion";
import { motion, palette, ui } from "@/constants/ui";
export default function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const reduced = useCalmMotion();
  const progress = useRef(new Animated.Value(current / total)).current;
  useEffect(() => {
    const animation = Animated.timing(progress, { toValue: current / total, duration: reduced ? 0 : motion.transition, useNativeDriver: false });
    animation.start(); return () => animation.stop();
  }, [current, total, reduced, progress]);
  return <View style={styles.container}>
    <View style={styles.labels}><Text accessibilityLiveRegion="polite" style={styles.label}>கேள்வி {current} / {total}</Text><Text style={ui.caption}>{Math.round(current / total * 100)}%</Text></View>
    <View style={styles.track} accessibilityRole="progressbar" accessibilityLabel="மதிப்பீட்டு முன்னேற்றம்" accessibilityValue={{ min: 1, max: total, now: current }}><Animated.View style={[styles.fill, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]} /></View>
  </View>;
}
const styles = StyleSheet.create({container: { gap: 10 }, labels: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }, label: { ...ui.caption, color: palette.heading, fontWeight: "600" }, track: { height: 6, backgroundColor: palette.border, borderRadius: 3, overflow: "hidden" }, fill: { height: "100%", backgroundColor: palette.primary, borderRadius: 3 }});
