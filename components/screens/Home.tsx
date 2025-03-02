import VendorMap from "@/components/features/vendors/VendorMap";
import VendorDetailsDrawer from "@/components/features/vendors/VendorDetailsDrawer";
import React, {useState} from "react";
import {useVendorsQuery} from "@/components/features/vendors/vendorService";
import {Vendor} from "@/components/features/vendors/models";

const Home = () => {

  const [currentVendor, setCurrentVendor] = useState<Vendor | undefined>(undefined)
  const [isVendorDetailsDisplayed, setIsVendorDetailsDisplayed] = useState<boolean>(false)

  const {data: vendorLocations} = useVendorsQuery()

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