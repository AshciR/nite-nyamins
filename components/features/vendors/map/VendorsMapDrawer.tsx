import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from "@/components/ui/drawer";
import React, {Dispatch, SetStateAction} from "react"
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {Vendor} from "@/components/features/vendors/models";
import {convertHourToString} from "@/components/features/vendors/utils";

type VendorDetailsDrawerProps = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  vendor?: Vendor
}

const VendorsMapDrawer: React.FC<VendorDetailsDrawerProps> = (
  {
    isOpen,
    onClose,
    vendor
  }
) => (
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
              {`Opening Hours: ${convertHourToString(vendor.openingHour)} - ${convertHourToString(vendor.closingHour)}`}
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
      <DrawerFooter/>
    </DrawerContent>
  </Drawer>
);

function getStarRating(rating: number) {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  return "🤤️".repeat(rating);
}

export default VendorsMapDrawer