import {Box} from "@/components/ui/box";
import {StyleSheet} from "react-native";

const Separator = () => {
  return (
    <Box className="h-px w-full bg-secondary-50"/>
  )
}

const styles = StyleSheet.create({
  horizontalLine: {
    height: 1,
    backgroundColor: '#000000', // or any color you prefer
    width: '100%',
  }
})

export {Separator}