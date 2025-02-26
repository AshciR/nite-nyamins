import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from "react";
import Home from "@/components/screens/Home";

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <SafeAreaView style={styles.container}>
        <Home/>
        <ExpoStatusBar style="auto"/>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});
