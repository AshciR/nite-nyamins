import {styled} from "@gluestack-style/react";
import {SafeAreaView as RNSafeAreaView} from "react-native";

const SafeAreaView = styled(
  RNSafeAreaView,
  {},
  {componentName: "SafeAreaView"}
)

export default SafeAreaView as const;