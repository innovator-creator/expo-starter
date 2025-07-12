import Constants from "expo-constants";
import { Stack } from "expo-router";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

export default function RootLayout() {
  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  return (
    <PrivyProvider
      appId={Constants.expoConfig?.extra?.privyAppId}
      clientId={Constants.expoConfig?.extra?.privyClientId}
    >
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="home" />
        // <Stack.Screen name="profile" />
        // <Stack.Screen name="wallet" />
        // <Stack.Screen name="transactions" />
        // <Stack.Screen name="send" />
        // <Stack.Screen name="receive" />
        // <Stack.Screen name="settings" />
        // <Stack.Screen name="security" />
        // <Stack.Screen name="notifications" />
        // <Stack.Screen name="help" />
        // <Stack.Screen name="about" />
      </Stack>
      <PrivyElements />
    </PrivyProvider>
  );
}
