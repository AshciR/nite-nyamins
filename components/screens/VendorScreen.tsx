import React from 'react';
import {Text} from "@/components/ui/text";
import {useStore} from "zustand/react";
import {useVendorStore} from "@/components/features/vendors/vendorStore";
import {VendorDetails} from "@/components/features/vendors/details/VendorDetails";
import {useVendorMenuQuery} from "@/components/features/vendors/vendorService";

const VendorScreen: React.FC = () => {

  const currentVendor = useStore(useVendorStore, (state) => state.currentVendor)

  const {
    data: vendorWithMenu,
    isPending,
    isError,
    error
  } = useVendorMenuQuery(currentVendor?.id ?? "1")

  if (isPending) {
    console.log("--- In loading component")
    return <Text>Loading...</Text>
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <VendorDetails vendorWithMenu={vendorWithMenu}/>
  );
};

export default VendorScreen;
