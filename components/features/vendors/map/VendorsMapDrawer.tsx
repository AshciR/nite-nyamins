import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from "@/components/ui/drawer";
import React, {Dispatch, SetStateAction, useCallback} from "react"
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {Vendor} from "@/components/features/vendors/models";
import {convertIsoTimeToAmOrPm} from "@/components/features/vendors/utils";
import {Button, ButtonText} from "@/components/ui/button";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {Routes, RoutesNames} from "@/components/screens/routes";

type VendorDetailsDrawerProps = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  vendor?: Vendor
  navigation: typeof useNavigation<NavigationProp<Routes>>
}

const VendorsMapDrawer: React.FC<VendorDetailsDrawerProps> = (
  {
    isOpen,
    onClose,
    vendor,
    navigation
  }
) => {

  const handleNavigateToDetails = useCallback(() => {
    onClose(false)
    navigation.navigate(RoutesNames.VENDORS)
  }, [onClose, navigation])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => onClose(false)}
      size="sm"
      anchor="bottom"
    >
      <DrawerBackdrop/>
      <DrawerContent>
        {vendor ? (
          <>
            <DrawerHeader>
              <Heading size="3xl">{vendor.name}</Heading>
              <DrawerCloseButton testID={"drawer-close-button"}/>
            </DrawerHeader>
            <DrawerBody>
              <Text className="font-semibold" size="lg">
                {`Opening Hours: ${convertIsoTimeToAmOrPm(vendor.openingTime)} - ${convertIsoTimeToAmOrPm(vendor.closingTime)}`}
              </Text>
              <Text className="font-semibold" size="lg">
                {`Ratings: ${getStarRating(vendor.rating)}`}
              </Text>
            </DrawerBody>
          </>
        ) : (
          <DrawerHeader>
            <Heading size="3xl">Whoops, no Vendor was Selected</Heading>
            <DrawerCloseButton/>
          </DrawerHeader>
        )}
        <DrawerFooter className="justify-center">
          <Button
            className="w-[90%] mb-10"
            testID={"vendor-map-drawer-details-button"}
            onPress={handleNavigateToDetails}
          >
            <ButtonText>Details</ButtonText>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
};

function getStarRating(rating: number) {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  return "🤤️".repeat(rating);
}

export default VendorsMapDrawer