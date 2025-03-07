import {render, screen} from '@testing-library/react-native';
import {MealCard} from "@/components/features/vendors/details/MealCard";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {Meal} from "@/components/features/vendors/models";
import { getMealImage, mealImages, defaultMeal } from './MealCard';

describe('<MealCard />', () => {

  const testMeal: Meal = {
    id: '1',
    name: 'Grilled Chicken',
    price: 1299,
    currency: 'USD',
    mealType: 'chicken',
  };

  test('renders meal name, price, and image correctly', () => {
    // When: The MealCard component is rendered with a test meal
    render(
      <MealCard meal={testMeal} />,
      { wrapper: GluestackUIProvider }
    );

    // Then: The meal details are displayed correctly
    expect(screen.getByText(testMeal.name)).toBeOnTheScreen();
    expect(screen.getByText(`$${testMeal.price}`)).toBeOnTheScreen();
    expect(screen.getByLabelText(`${testMeal.mealType} meal image`)).toBeOnTheScreen();
  });

});

describe('getMealImage', () => {
  it('should return the correct image for mealType "chicken"', () => {
    const result = getMealImage('chicken');
    expect(result).toBe(mealImages.chicken);
  });

  it('should return the correct image for mealType "pork"', () => {
    const result = getMealImage('pork');
    expect(result).toBe(mealImages.pork);
  });

  it('should return the correct image for mealType "fish"', () => {
    const result = getMealImage('fish');
    expect(result).toBe(mealImages.fish);
  });

  it('should return the correct image for mealType "vegetarian"', () => {
    const result = getMealImage('vegetarian');
    expect(result).toBe(mealImages.vegetarian);
  });

  it('should return the default image when mealType is undefined', () => {
    const result = getMealImage(undefined);
    expect(result).toBe(defaultMeal);
  });

  it('should return the default image when mealType is invalid', () => {
    // Casting "invalid" as any to bypass TypeScript type-checking for this test case.
    const result = getMealImage("invalid" as any);
    expect(result).toBe(defaultMeal);
  });
});
