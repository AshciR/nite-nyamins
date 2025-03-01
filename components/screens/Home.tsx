import VendorMap from "@/components/features/vendors/VendorMap";
import VendorDetailsDrawer from "@/components/features/vendors/VendorDetailsDrawer";
import React, {useEffect, useState} from "react";
import {fetchVendors} from "@/components/features/vendors/vendorApi";
import {convertVendorJsonToPointFeature, Vendor} from "@/components/features/vendors/models";
import {featureCollection} from "@turf/turf";
import {FeatureCollection, GeoJsonObject} from "geojson";

const Home = () => {

  const [currentVendor, setCurrentVendor] = useState<Vendor | undefined>(undefined)
  const [vendorLocations, setVendorLocations] = useState<FeatureCollection<GeoJsonObject, Vendor> | undefined>(undefined)
  const [isVendorDetailsDisplayed, setIsVendorDetailsDisplayed] = useState<boolean>(false)

  useEffect(() => {
    fetchVendors()
      .then((resp) => resp.json())
      .then(vendorList => vendorList.vendors.map(v => convertVendorJsonToPointFeature(v)))
      .then(points => setVendorLocations(featureCollection(points)))
  }, [])

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