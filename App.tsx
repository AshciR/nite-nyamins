import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainNavigator from "@/components/screens/MainNavigator";
import SafeAreaView from "@/components/ui/safe-area-view";

export default function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <NavigationContainer>
          <SafeAreaView
            className={"flex-1 bg-background-100 justify-start"}
            style={styles.container}
          >
            <MainNavigator/>
            <ExpoStatusBar
              style="auto"
            />
          </SafeAreaView>
        </NavigationContainer>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});
