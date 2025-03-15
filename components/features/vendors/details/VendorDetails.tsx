import React from "react";
import {FlatList} from "react-native";
import {VendorWithMenu} from "@/components/features/vendors/models";
import {VStack} from "@/components/ui/vstack";
import {isVendorOpen} from "@/components/features/vendors/utils";
import {VendorNameAndOpeningHours} from "@/components/features/vendors/details/VendorNameAndOpeningHours";
import {Separator} from "@/components/features/vendors/details/Separator";
import {MealCard} from "@/components/features/vendors/details/MealCard";
import {Box} from "@/components/ui/box";

type VendorDetailsProps = {
  vendorWithMenu?: VendorWithMenu
  currentDate: Date
}

const VendorDetails: React.FC<VendorDetailsProps> = (
  {
    vendorWithMenu,
    currentDate
  }
) => {

  const currentHour = currentDate.getHours()

  const vendor = vendorWithMenu?.vendor
  const menu = vendorWithMenu?.menu ?? []
  const isOpen = isVendorOpen(currentHour, vendor, currentDate)

  return (
    <VStack
      className={"flex-1 justify-start items-center bg-background-100 border-blue-500 border pt-[5%] pb-[5%]"}
      space="lg"
    >

      <VendorNameAndOpeningHours
        currentVendor={vendor}
        isOpen={isOpen}
      />

      <VStack
        className={"flex-1 w-[90%] border border-black border-dotted"}
        space={"sm"}
      >
        <FlatList
          data={menu}
          renderItem={({item}) => <MealCard meal={item}/>}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          ItemSeparatorComponent={() => <Box style={{height: "0.5%"}}/>}
          contentContainerStyle={{paddingBottom: "15%"}}
          ListFooterComponent={() => <Box style={{height: 30}}/>}
        />
      </VStack>

    </VStack>
  )
}


export {VendorDetails};