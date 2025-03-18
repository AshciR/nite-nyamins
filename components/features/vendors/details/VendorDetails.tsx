import React from "react";
import {FlatList} from "react-native";
import {VendorWithMenu} from "@/components/features/vendors/models";
import {VStack} from "@/components/ui/vstack";
import {isVendorOpen} from "@/components/features/vendors/utils";
import {VendorNameAndOpeningHours} from "@/components/features/vendors/details/VendorNameAndOpeningHours";
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
      className={"flex-1 justify-start items-center bg-background-50 border-blue-500 border p-[1%] pt-0"}
    >

      <VendorNameAndOpeningHours
        currentVendor={vendor}
        isOpen={isOpen}
      />

      <VStack
        className={"flex-1 w-[100%] border border-black border-dotted"}
        space={"sm"}
      >
        <FlatList
          data={menu}
          renderItem={({item}) => <MealCard meal={item}/>}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={{paddingBottom: "15%"}}
          ListFooterComponent={() => <Box style={{height: 30}}/>}
          ItemSeparatorComponent={() => (
            <Box className="h-px w-full bg-secondary-500"/>
          )}
        />
      </VStack>

    </VStack>
  )
}


export {VendorDetails};