import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { palette } from "@/constants/ui";

// When approved artwork is available, set this to:
// require("../../assets/images/maa-care-home-hero.png")
const heroSource: ImageSourcePropType | null = null;
export default function HeroArtwork({ compact = false }: { compact?: boolean }) {
  return <View style={[styles.frame, compact && { height: 110 }]} accessible={false} aria-hidden accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
    {heroSource ? <Image source={heroSource} style={styles.image} resizeMode="contain" /> : <View style={[styles.motif, compact && { transform: [{ scale: 0.72 }] }]}>
      <View style={styles.outer} /><View style={styles.inner} />
      <View style={styles.center}><Image source={require("../../assets/images/maa-care-mark.png")} style={styles.mark} resizeMode="contain" /></View>
      <View style={styles.dot} />
    </View>}
  </View>;
}
const styles = StyleSheet.create({
  frame: { width: "100%", height: 170, alignItems: "center", justifyContent: "center" },
  image: { width: "100%", height: "100%" },
  motif: { width: 220, height: 160, alignItems: "center", justifyContent: "center" },
  outer: { position: "absolute", width: 204, height: 146, borderRadius: 70, backgroundColor: palette.lavender, transform: [{ rotate: "-12deg" }] },
  inner: { position: "absolute", width: 165, height: 144, borderRadius: 65, backgroundColor: palette.selected, transform: [{ rotate: "20deg" }] },
  center: { width: 110, height: 110, borderRadius: 55, backgroundColor: palette.surface, alignItems: "center", justifyContent: "center" },
  mark: { width: 88, height: 88 },
  dot: { position: "absolute", right: 10, top: 20, width: 10, height: 10, borderRadius: 5, backgroundColor: palette.accent },
});
