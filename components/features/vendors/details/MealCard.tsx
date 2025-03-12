import React from "react";
import {Meal, MealType} from "@/components/features/vendors/models";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {Image} from "@/components/ui/image";
import {StyleSheet} from "react-native";
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
    <Card style={styles.cardContainer}>
      <HStack style={styles.textAndImageContainer}>
        <VStack style={styles.nameAndPriceContainer}>
          <Heading size="md" testID={"meal-card-meal-name"}>
            {meal.name}
          </Heading>
          <Text testID={"meal-card-meal-price"}>
            {`$${meal.price}`}
          </Text>
        </VStack>
        <Box
          style={styles.imageContainer}
          className="overflow-hidden"
        >
          <Image
            source={mealImageUri}
            alt={`${meal.mealType} meal image`}
            size="none"
            className="rounded-full aspect-square w-full h-full object-cover"
          />
        </Box>
      </HStack>
    </Card>

  )
}

const mealImages: Record<MealType, any> = {
  chicken: require("../../../../assets/meals/chicken-meal-type.png"),
  pork: require("../../../../assets/meals/pork-meal-type.png"),
  fish: require("../../../../assets/meals/fish-meal-type.png"),
  vegetarian: require("../../../../assets/meals/vegeterian-meal-type.png"),
};

const defaultMeal = require("../../../../assets/meals/default-meal-type.png")
const getMealImage = (mealType?: MealType) => mealImages[mealType as MealType] ?? defaultMeal;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    borderStyle: "dotted",
    borderColor: "black",
    borderWidth: 1,
  },
  textAndImageContainer: {
    flex: 1,
    justifyContent: "space-between",
    borderStyle: "dotted",
    borderColor: "blue",
    borderWidth: 1
  },
  nameAndPriceContainer: {
    borderStyle: "dotted",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    flex: 3
  },
  imageContainer: {
    borderStyle: "dotted",
    borderColor: "green",
    borderWidth: 1,
    flex: 1
  },
})

export {MealCard, defaultMeal, getMealImage, mealImages}