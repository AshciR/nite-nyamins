import React from "react";
import {FlatList} from "react-native";
import {VendorWithMenu} from "@/components/features/vendors/models";
import {VStack} from "@/components/ui/vstack";
import {isVendorOpen} from "@/components/features/vendors/utils";
import {VendorNameAndOpeningHours} from "@/components/features/vendors/details/VendorNameAndOpeningHours";
import {MealCard} from "@/components/features/vendors/details/MealCard";
import {Box} from "@/components/ui/box";
import {Heading} from "@/components/ui/heading";
import {RoutesNames} from "@/components/screens/routes";
import {Separator} from "@/components/features/vendors/details/Separator";

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
      className={"flex-1 justify-start items-center bg-background-50 pt-0"}
    >

      <Heading
        size="2xl"
        testID={"vendor-details-title"}
        className={"self-start mb-[4%] pl-[2%]"}
      >
        {RoutesNames.VENDOR}
      </Heading>
      <VendorNameAndOpeningHours
        currentVendor={vendor}
        isOpen={isOpen}
      />

      <VStack
        className={"flex-1 w-[100%] mt-[2%]"}
        space={"sm"}
      >
        <FlatList
          data={menu}
          renderItem={({item}) => <MealCard meal={item}/>}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={{paddingBottom: "15%"}}
          ListFooterComponent={() => <Box style={{height: 30}}/>}
          ItemSeparatorComponent={Separator}
        />
      </VStack>

    </VStack>
  )
}


export {VendorDetails};