import VendorsMap from "@/components/features/vendors/map/VendorsMap";
import VendorsMapDrawer from "@/components/features/vendors/map/VendorsMapDrawer";
import React from "react";
import {useVendorsQuery} from "@/components/features/vendors/vendorService";
import {useVendorStore} from "@/components/features/vendors/vendorStore";
import {useStore} from "zustand/react";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {Routes} from "@/components/screens/routes";

const HomeScreen: React.FC= () => {

  // Handle state management
  const currentVendor = useStore(useVendorStore, (state) => state.currentVendor)
  const setCurrentVendor = useStore(useVendorStore, (state) => state.setCurrentVendor)
  const isVendorDetailsDisplayed = useStore(useVendorStore, (state) => state.isVendorDetailsDisplayed)
  const setIsVendorDetailsDisplayed = useStore(useVendorStore, (state) => state.setIsVendorDetailsDisplayed)

  // Handle Data fetching
  const {data: vendorLocations} = useVendorsQuery()

  // Handles Navigation
  const navigation = useNavigation<NavigationProp<Routes>>();

  return (
    <>
      <VendorsMap
        vendorLocations={vendorLocations}
        setIsVendorDetailsDisplayed={setIsVendorDetailsDisplayed}
        setCurrentVendor={setCurrentVendor}
      />
      <VendorsMapDrawer
        isOpen={isVendorDetailsDisplayed}
        onClose={setIsVendorDetailsDisplayed}
        vendor={currentVendor}
        navigation={navigation as typeof useNavigation}
      />
    </>
  )

}

export default HomeScreen;