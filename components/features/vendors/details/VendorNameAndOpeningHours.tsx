import {Vendor} from "@/components/features/vendors/models";
import React from "react";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {Ionicons} from "@expo/vector-icons";
import {Text} from "@/components/ui/text";
import {convertHourToString} from "@/components/features/vendors/utils";
import {Badge, BadgeText} from "@/components/ui/badge";
import {StyleSheet} from "react-native";

type VendorNameAndOpeningHoursProps = {
  currentVendor?: Vendor,
  isOpen: boolean
}
export const VendorNameAndOpeningHours: React.FC<VendorNameAndOpeningHoursProps> = (
  {
    currentVendor,
    isOpen
  }
) => {
  return (
    <VStack style={styles.nameAndOpeningHoursContainer}>
      <Heading size={"3xl"}>{currentVendor?.name}</Heading>
      <HStack style={styles.openingHoursInnerContainer}>

        <HStack style={styles.visible}>
          <Ionicons name={"time-outline"} size={20}/>
          <Text>
            {`${convertHourToString(currentVendor?.openingHour ?? 0)} - ${convertHourToString(currentVendor?.closingHour ?? 0)}`}
          </Text>
        </HStack>

        <HStack style={styles.visible} reversed={true}>
          <Badge
            size="md"
            variant="solid"
            action={isOpen ? "success" : "error"}
          >
            <BadgeText>
              {isOpen ? "Open" : "Closed"}
            </BadgeText>
          </Badge>
        </HStack>

      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  nameAndOpeningHoursContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: "90%",
    borderColor: '#000000',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
  openingHoursInnerContainer: {
    flex: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: '#000000',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
  visible: {
    flex: 1,
    borderColor: 'blue',
    borderStyle: 'dotted',
    borderWidth: 1
  },
})