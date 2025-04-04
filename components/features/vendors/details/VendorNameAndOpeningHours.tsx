import {Vendor} from "@/components/features/vendors/models";
import React from "react";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {Ionicons} from "@expo/vector-icons";
import {Text} from "@/components/ui/text";
import {convertIsoTimeToAmOrPm} from "@/components/features/vendors/utils";
import {Badge, BadgeText} from "@/components/ui/badge";

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
      <VStack className={containerStyle}>
        <Heading size={"3xl"}>No vendor available</Heading>
      </VStack>
    );
  }

  return (
    <VStack className={containerStyle}>
      <Heading
        size={"3xl"}
        className={"text-typography-950"}
        testID={"vendor-details-vendor-name"}
      >
        {currentVendor?.name}
      </Heading>
      
      <HStack
        className={"w-[100%] items-center justify-between border border-dotted"}
      >

        <HStack className={blueBorder}>
          <Ionicons name={"time-outline"} size={20}/>
          <Text>
            {`${convertIsoTimeToAmOrPm(currentVendor?.openingTime ?? "")} - ${convertIsoTimeToAmOrPm(currentVendor?.closingTime ?? "")}`}
          </Text>
        </HStack>

        <HStack
          className={blueBorder}
          reversed={true}>
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

const containerStyle = 'flex justify-start items-start w-[100%] pl-[1%] pr-[1%] border border-dotted border-black bg-secondary-0';
const blueBorder = "border border-blue-500 border-dotted"