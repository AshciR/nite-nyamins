import {Vendor} from "@/components/features/vendors/models";
import React from "react";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {Ionicons} from "@expo/vector-icons";
import {Text} from "@/components/ui/text";
import {convertIsoTimeToAmOrPm} from "@/components/features/vendors/utils";
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

  if (!currentVendor) {
    return (
      <VStack style={styles.container}>
        <Heading size={"3xl"}>No vendor available</Heading>
      </VStack>
    );
  }

  return (
    <VStack style={styles.container}>
      <Heading
        size={"3xl"}
        style={styles.headingText}
        testID={"vendor-details-vendor-name"}
      >
        {currentVendor?.name}
      </Heading>
      
      <HStack style={styles.openingHoursContainer}>

        <HStack style={styles.flexZero}>
          <Ionicons name={"time-outline"} size={20}/>
          <Text>
            {`${convertIsoTimeToAmOrPm(currentVendor?.openingTime ?? "")} - ${convertIsoTimeToAmOrPm(currentVendor?.closingTime ?? "")}`}
          </Text>
        </HStack>

        <HStack style={styles.flexZero} reversed={true}>
          <Badge
            size="md"
            variant="solid"
            action={isOpen ? "success" : "error"}
          >
            <BadgeText testID={"vendor-details-vendor-open"}>
              {isOpen ? "Open" : "Closed"}
            </BadgeText>
          </Badge>
        </HStack>

      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: "90%",
    borderColor: '#000000',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
  headingText: {
    color: '#000000'
  },
  openingHoursContainer: {
    flex: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: '#000000',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
  flexZero: {
    flex: 0,
    borderColor: 'blue',
    borderStyle: 'dotted',
    borderWidth: 1
  },
})