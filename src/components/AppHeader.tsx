import { palette } from "@/constants/ui";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AppHeader({ compact = false, onAboutPress }: { compact?: boolean; onAboutPress?: () => void }) {
  return (
    <View style={[styles.headerContainer, compact && styles.compactHeader]}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={[styles.logo, compact && styles.compactLogo]}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        Maa Care
      </Text>
      {onAboutPress && (
        <TouchableOpacity accessibilityRole="button" onPress={onAboutPress} style={styles.aboutButton}>
          <Text style={styles.aboutText}>செயலி பற்றி</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  compactHeader: { paddingVertical: 6 },
  compactLogo: { width: 32, height: 32, marginRight: 8 },
  aboutButton: { marginLeft: "auto", paddingLeft: 12, minHeight: 44, justifyContent: "center", maxWidth: "40%" },
  aboutText: { fontSize: 13, lineHeight: 20, color: palette.primary, fontWeight: "600", textAlign: "right" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: palette.surface,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    width: "100%",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  title: {
    flexShrink: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
});
