import VendorMap from "@/components/features/vendors/VendorMap";
import VendorDetailsDrawer from "@/components/features/vendors/VendorDetailsDrawer";
import React, {useState} from "react";
import vendorLocations from "@/components/features/vendors/vendorData";
import {Vendor} from "@/models";

const Home = () => {

  const [currentVendor, setCurrentVendor] = useState<Vendor | undefined>(undefined)
  const [isVendorDetailsDisplayed, setIsVendorDetailsDisplayed] = useState<boolean>(false)

  return (
    <>
      <VendorMap
        vendorLocations={vendorLocations}
        setIsVendorDetailsDisplayed={setIsVendorDetailsDisplayed}
        setCurrentVendor={setCurrentVendor}
      />
      <VendorDetailsDrawer
        isOpen={isVendorDetailsDisplayed}
        onClose={setIsVendorDetailsDisplayed}
        vendor={currentVendor}
      />
    </>
  )

}

export default Home;