import VendorMap from "@/components/features/vendors/map/VendorMap";
import VendorMapDrawer from "@/components/features/vendors/map/VendorMapDrawer";
import React from "react";
import {useVendorsQuery} from "@/components/features/vendors/vendorService";
import {useVendorStore} from "@/components/features/vendors/vendorStore";
import {useStore} from "zustand/react";

const HomeScreen = () => {

  const currentVendor = useStore(useVendorStore, (state) => state.currentVendor)
  const setCurrentVendor = useStore(useVendorStore, (state) => state.setCurrentVendor)
  const isVendorDetailsDisplayed = useStore(useVendorStore, (state) => state.isVendorDetailsDisplayed)
  const setIsVendorDetailsDisplayed = useStore(useVendorStore, (state) => state.setIsVendorDetailsDisplayed)

  const {data: vendorLocations} = useVendorsQuery()

  return (
    <>
      <VendorMap
        vendorLocations={vendorLocations}
        setIsVendorDetailsDisplayed={setIsVendorDetailsDisplayed}
        setCurrentVendor={setCurrentVendor}
      />
      <VendorMapDrawer
        isOpen={isVendorDetailsDisplayed}
        onClose={setIsVendorDetailsDisplayed}
        vendor={currentVendor}
      />
    </>
  )

}

export default HomeScreen;