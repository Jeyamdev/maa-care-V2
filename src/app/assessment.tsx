import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { questions } from "@/constants/questions";
import { palette, ui } from "@/constants/ui";

export default function AssessmentScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [answerRequired, setAnswerRequired] = useState(false);
  const scroll = useRef<ScrollView>(null);
  const submitting = useRef(false);
  const { fontScale, width } = useWindowDimensions();
  const question = questions[currentQuestion];

  useEffect(() => {
    scroll.current?.scrollTo({ y: 0, animated: false });
    setAnswerRequired(false);
    submitting.current = false;
  }, [currentQuestion]);

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      setAnswerRequired(true);
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((current) => current + 1);
    } else if (!submitting.current) {
      submitting.current = true;
      router.replace({ pathname: "/results", params: { answers: JSON.stringify(answers) } });
    }
  };

  return (
    <SafeAreaView style={ui.screen} edges={["left", "right"]}>
      <ScrollView ref={scroll} style={styles.scroll} contentContainerStyle={ui.content}>
        <View style={styles.progressSection}>
          <Text accessibilityLiveRegion="polite" style={styles.progressText}>கேள்வி {currentQuestion + 1} / {questions.length}</Text>
          <View
            style={styles.progressTrack}
            accessibilityRole="progressbar"
            accessibilityLabel="மதிப்பீட்டு முன்னேற்றம்"
            accessibilityValue={{ min: 1, max: questions.length, now: currentQuestion + 1 }}
          >
            <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / questions.length) * 100}%` }]} />
          </View>
          <Text style={ui.caption}>கடந்த 7 நாட்களில் நீங்கள் உணர்ந்ததை நினைத்துப் பதிலளிக்கவும்.</Text>
        </View>
        <View style={ui.card}>
          <Text accessibilityRole="header" style={styles.question}>{question.question}</Text>
        </View>
        <View style={styles.options}>
          {question.options.map((option, index) => {
            const selected = answers[currentQuestion] === index;
            return (
              <TouchableOpacity
                key={`${question.id}-${index}`}
                accessibilityRole="radio"
                accessibilityLabel={option}
                accessibilityState={{ checked: selected }}
                style={[styles.option, selected && styles.selectedOption]}
                onPress={() => {
                  setAnswers((previous) => {
                    const updated = [...previous];
                    updated[currentQuestion] = index;
                    return updated;
                  });
                  setAnswerRequired(false);
                }}
                activeOpacity={0.85}
              >
                <View style={[styles.radio, selected && styles.selectedRadio]}>
                  {selected && <Text accessible={false} style={styles.check}>✓</Text>}
                </View>
                <Text style={[ui.body, styles.optionText, selected && styles.selectedText]}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <SafeAreaView style={ui.footer} edges={["bottom"]}>
        <View style={ui.footerContent}>
          {answerRequired && <Text accessibilityRole="alert" accessibilityLiveRegion="assertive" style={styles.error}>தொடர்வதற்கு முன் ஒரு பதிலைத் தேர்ந்தெடுக்கவும்.</Text>}
          <View style={[styles.buttons, (fontScale > 1.3 || width < 350) && styles.stackedButtons]}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ disabled: currentQuestion === 0 }}
              style={[ui.secondaryButton, styles.action, currentQuestion === 0 && styles.disabled]}
              disabled={currentQuestion === 0}
              onPress={() => setCurrentQuestion((current) => current - 1)}
            >
              <Text style={ui.secondaryText}>முந்தையது</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={[ui.button, styles.action]} onPress={handleNext}>
              <Text style={ui.buttonText}>{currentQuestion === questions.length - 1 ? "முடி" : "அடுத்து"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  progressSection: { gap: 12 },
  progressText: { fontSize: 16, fontWeight: "600", color: palette.heading },
  progressTrack: { height: 8, backgroundColor: palette.border, borderRadius: 8, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: palette.primary },
  question: { fontSize: 22, lineHeight: 34, fontWeight: "600", color: palette.text },
  options: { gap: 12 },
  option: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: palette.surface, borderWidth: 2, borderColor: palette.border, borderRadius: 16, padding: 16, minHeight: 60 },
  selectedOption: { borderColor: palette.primary, backgroundColor: palette.selected },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: palette.muted, alignItems: "center", justifyContent: "center" },
  selectedRadio: { backgroundColor: palette.primary, borderColor: palette.primary },
  check: { color: palette.surface, fontSize: 15, fontWeight: "bold", lineHeight: 18 },
  optionText: { flex: 1 },
  selectedText: { color: palette.heading, fontWeight: "600" },
  buttons: { flexDirection: "row", gap: 12 },
  stackedButtons: { flexDirection: "column" },
  action: { flexGrow: 1, flexBasis: 0 },
  disabled: { opacity: 0.45 },
  error: { ...ui.caption, color: palette.danger, marginBottom: 10 },
});
