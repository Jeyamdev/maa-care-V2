import { palette } from "@/constants/ui";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({ duration: 250, fade: true });

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackTitle: 'பின்செல்',
          headerTintColor: palette.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: palette.surface,
          },
          contentStyle: {
            backgroundColor: palette.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="assessment-info"
          options={{
            title: 'மதிப்பீட்டு வழிகாட்டி',
          }}
        />
        <Stack.Screen
          name="assessment"
          options={{
            title: 'மதிப்பீடு',
          }}
        />
        <Stack.Screen
          name="results"
          options={{
            title: 'மதிப்பீட்டு முடிவு',
          }}
        />
        <Stack.Screen
          name="result"
          options={{
            title: 'மதிப்பீட்டு முடிவு',
          }}
        />
        <Stack.Screen
          name="history"
          options={{
            title: 'மதிப்பீட்டு வரலாறு',
          }}
        />
        <Stack.Screen
          name="assessment-detail"
          options={{
            title: 'மதிப்பீட்டு விவரம்',
          }}
        />
        <Stack.Screen
          name="assessmentDetail"
          options={{
            title: 'மதிப்பீட்டு விவரம்',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'அமைப்புகள்',
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: 'செயலி பற்றி',
          }}
        />
      </Stack>
    </>
  );
}
