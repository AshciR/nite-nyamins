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
  setIsVendorDetailsDisplayed: Dispatch<SetStateAction<boolean>>
  vendor?: Vendor
  setCurrentVendor: Dispatch<SetStateAction<Vendor |undefined>>
  navigation: typeof useNavigation<NavigationProp<Routes>>
}

const VendorsMapDrawer: React.FC<VendorDetailsDrawerProps> = (
  {
    isOpen,
    setIsVendorDetailsDisplayed,
    vendor,
    setCurrentVendor,
    navigation
  }
) => {

  const handleNavigateToDetails = () => {
    setIsVendorDetailsDisplayed(false)
    navigation.navigate(RoutesNames.VENDOR)
  }

  const handleOnCloseDrawer = () => {
    setCurrentVendor(undefined)
    setIsVendorDetailsDisplayed(false)
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleOnCloseDrawer}
      size="sm"
      anchor="bottom"
    >
      <DrawerBackdrop/>
      <DrawerContent>
        {vendor ? (
          <>
            <DrawerHeader>
              <Heading size="2xl">{vendor.name}</Heading>
              <DrawerCloseButton testID={"drawer-close-button"}/>
            </DrawerHeader>
            <DrawerBody>
              <Text className="font-semibold" size="lg">
                {"Opening Hours:"}
              </Text>
              <Text className="font-semibold text-brand-300" size="lg">
                {`${convertIsoTimeToAmOrPm(vendor.openingTime)} - ${convertIsoTimeToAmOrPm(vendor.closingTime)}`}
              </Text>
            </DrawerBody>
            <DrawerFooter className="justify-center">
              <Button
                className="w-[90%] mb-10 bg-brand-500"
                testID={"vendor-map-drawer-details-button"}
                onPress={handleNavigateToDetails}
              >
                <ButtonText>Menu</ButtonText>
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <DrawerHeader>
            <Heading size="3xl">Whoops, no Vendor was Selected</Heading>
            <DrawerCloseButton/>
          </DrawerHeader>
        )}
      </DrawerContent>
    </Drawer>
  )
};

export default VendorsMapDrawer