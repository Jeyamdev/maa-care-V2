import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

export interface AssessmentRecord {
  id: string;
  createdAt: string;
  score: number;
  riskLevel: string;
  safetyAlert: boolean;
  answers: number[];
}

export const saveAssessment = async (assessment: AssessmentRecord): Promise<boolean> => {
  try {
    const existingHistory = await getAssessmentHistory();

    const updatedHistory = [
      assessment,
      ...existingHistory.filter((item) => item.id !== assessment.id),
    ];

    await AsyncStorage.setItem(
      STORAGE_KEYS.HISTORY,
      JSON.stringify(updatedHistory)
    );

    return true;
  } catch (error) {
    console.log("Save Assessment Error:", error);
    return false;
  }
};

export const getAssessmentHistory = async (): Promise<AssessmentRecord[]> => {
  try {
    const history = await AsyncStorage.getItem(
      STORAGE_KEYS.HISTORY
    );

    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.log("Get History Error:", error);
    return [];
  }
};

export const deleteAssessment = async (id: string): Promise<boolean> => {
  try {
    const history = await getAssessmentHistory();

    const updatedHistory = history.filter(
      (item) => item.id !== id
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.HISTORY,
      JSON.stringify(updatedHistory)
    );

    return true;
  } catch (error) {
    console.log("Delete Error:", error);
    return false;
  }
};

export const clearAssessmentHistory = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(
      STORAGE_KEYS.HISTORY
    );

    return true;
  } catch (error) {
    console.log("Clear History Error:", error);
    return false;
  }
};
