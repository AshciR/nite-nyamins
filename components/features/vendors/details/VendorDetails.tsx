import React from "react";
import {StyleSheet, ViewStyle} from "react-native";
import {VendorWithMenu} from "@/components/features/vendors/models";
import {VStack} from "@/components/ui/vstack";
import {isVendorOpen} from "@/components/features/vendors/utils";
import {VendorNameAndOpeningHours} from "@/components/features/vendors/details/VendorNameAndOpeningHours";
import {Separator} from "@/components/features/vendors/details/Separator";
import {MealCard} from "@/components/features/vendors/details/MealCard";

type VendorDetailsProps = {
  vendorWithMenu?: VendorWithMenu
}

const VendorDetails: React.FC<VendorDetailsProps> = ({vendorWithMenu}) => {

  const currentHour = new Date().getHours()

  const vendor = vendorWithMenu?.vendor
  console.log("--- In Vendor Details component. vendor =", vendor)

  const menu = vendorWithMenu?.menu ?? []
  console.log("--- In Vendor Details component. menu =", menu)

  const isOpen = isVendorOpen(currentHour, vendor)

  return (
    <VStack style={styles.container} space="lg">

      <VendorNameAndOpeningHours
        currentVendor={vendor}
        isOpen={isOpen}
      />

      <VStack style={styles.separatorContainer}>
        <Separator/>
      </VStack>

      <VStack style={styles.menuContainer} space={"sm"}>
        <MealCard meal={menu[0]}/>
        <MealCard meal={menu[1]}/>
        <MealCard meal={menu[0]}/>
        <MealCard meal={menu[1]}/>
        <MealCard meal={menu[0]}/>
      </VStack>

    </VStack>
  );
}

const commonContainerStyles: ViewStyle = {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: "90%",
  borderColor: '#000000',
  borderStyle: 'dotted',
  borderWidth: 1,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderColor: '#000000',
    borderWidth: 1,
    paddingTop: "5%",
    paddingBottom: "5%",
    margin: "2%"
  },
  separatorContainer: {
    width: "90%"
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: "90%",
    backgroundColor: '#f2f2f2',
    borderColor: '#000000',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
});

export {VendorDetails};