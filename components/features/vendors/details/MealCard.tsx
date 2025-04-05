import React from "react";
import {Meal, MealType} from "@/components/features/vendors/models";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Image} from "@/components/ui/image";
import {Heading} from "@/components/ui/heading";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";
import {Box} from "@/components/ui/box";

type MealCardProps = {
  meal: Meal
}

const MealCard: React.FC<MealCardProps> = ({meal}) => {
  const mealImageUri = getMealImage(meal.mealType)

  return (
    <Card className={"w-[100%] bg-secondary-0"}>
      <HStack className={"flex-1 justify-between"}>
        <VStack className={"flex-1 justify-center"}>
          <Heading
            className={"text-typography-950"}
            size="md"
            testID={"meal-card-meal-name"}
          >
            {meal.name}
          </Heading>
          <Text
            className={"text-typography-700"}
            testID={"meal-card-meal-price"}
          >
            {`$${meal.price}`}
          </Text>
        </VStack>
        <Box className="flex-3 overflow-hidden">
          <Image
            source={mealImageUri}
            alt={`${meal.mealType} meal image`}
            className="rounded-full aspect-square"
          />
        </Box>
      </HStack>
    </Card>

  )
}

const mealImages: Record<MealType, any> = {
  chicken: require("../../../../assets/meals/chicken-icon.png"),
  pork: require("../../../../assets/meals/pork-icon.png"),
  soup: require("../../../../assets/meals/soup-icon.png"),
  vegetarian: require("../../../../assets/meals/vegetarian-icon.png"),
  drink: require("../../../../assets/meals/drink-icon.png"),
  fish: require("../../../../assets/meals/fish-icon.png"),
};

const defaultMeal = require("../../../../assets/meals/default-icon.png")
const getMealImage = (mealType?: MealType) => mealImages[mealType as MealType] ?? defaultMeal;

export {MealCard, defaultMeal, getMealImage, mealImages}