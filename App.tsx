import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from "react";
import Home from "@/components/screens/Home";

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
        <SafeAreaView style={styles.container}>
          <Home/>
          <ExpoStatusBar style="auto"/>
        </SafeAreaView>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});
