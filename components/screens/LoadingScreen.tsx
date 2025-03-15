import React from "react";
import {VStack} from "@/components/ui/vstack";
import {Spinner} from "@/components/ui/spinner";
import {Heading} from "@/components/ui/heading";

type LoadingScreenProps = {
  loadingText?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({loadingText = "Loading..."}) => {
  return (
    <VStack className={"flex-1 justify-center items-center"}>
      <Spinner size={"large"}/>
      <Heading
        size={"lg"}
        className={"text-typography-900"}
      >
        {loadingText}
      </Heading>
    </VStack>
  )
}

export {LoadingScreen}