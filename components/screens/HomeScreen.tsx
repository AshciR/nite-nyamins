import VendorsMap from "@/components/features/vendors/map/VendorsMap";
import VendorsMapDrawer from "@/components/features/vendors/map/VendorsMapDrawer";
import React from "react";
import {useVendorsQuery} from "@/components/features/vendors/vendorService";
import {useVendorStore} from "@/components/features/vendors/vendorStore";
import {useStore} from "zustand/react";

const HomeScreen: React.FC= () => {

  const currentVendor = useStore(useVendorStore, (state) => state.currentVendor)
  const setCurrentVendor = useStore(useVendorStore, (state) => state.setCurrentVendor)
  const isVendorDetailsDisplayed = useStore(useVendorStore, (state) => state.isVendorDetailsDisplayed)
  const setIsVendorDetailsDisplayed = useStore(useVendorStore, (state) => state.setIsVendorDetailsDisplayed)

  const {data: vendorLocations} = useVendorsQuery()

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
      />
    </>
  )

}

export default HomeScreen;