import {StyleSheet} from "react-native";
import React from "react";
import {VStack} from "@/components/ui/vstack";
import {Spinner} from "@/components/ui/spinner";
import {Heading} from "@/components/ui/heading";

type LoadingScreenProps = {
  loadingText?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({loadingText = "Loading..."}) => {
  return (
    <VStack style={styles.container}>
      <Spinner size={"large"}/>
      <Heading size={"lg"}>{loadingText}</Heading>
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export {LoadingScreen}