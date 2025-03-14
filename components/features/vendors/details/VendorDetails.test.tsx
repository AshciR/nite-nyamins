import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {VendorDetails} from './VendorDetails';
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {Meal, Vendor, VendorWithMenu} from "@/components/features/vendors/models";


describe('VendorDetails', () => {

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-03-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Sample test data
  const mockVendor: Vendor = {
    id: 'v1',
    name: 'Test Restaurant',
    openingTime: '09:00:00',
    closingTime: '21:00:00',
    rating: 4.5
  };

  const mockMenu: Meal[] = [
    { id: 'm1', name: 'Roast Chicken', price: 12.99, currency: 'USD', mealType: 'chicken' },
    { id: 'm2', name: 'Vegetable Stir Fry', price: 9.99, currency: 'USD', mealType: 'vegetarian' },
    { id: 'm3', name: 'Grilled Fish', price: 14.99, currency: 'USD', mealType: 'fish' }
  ];

  const mockVendorWithMenu: VendorWithMenu = {
    vendor: mockVendor,
    menu: mockMenu
  };

  test('renders correctly with vendor data and menu', () => {
    // Given: Vendor is open
    const currentDate = new Date('2025-03-10T20:00:00Z') // Vendor closes at 21:00 (9:00PM)

    // When: The component is rendered with vendor and menu data
    render(
      <VendorDetails
        vendorWithMenu={mockVendorWithMenu}
        currentDate={currentDate}
      />,
      { wrapper: GluestackUIProvider }
    );

    // Then: VendorNameAndOpeningHours should be rendered with correct props
    expect(screen.getByTestId("vendor-details-vendor-name")).toHaveTextContent("Test Restaurant")
    expect(screen.getByTestId("vendor-details-vendor-open")).toHaveTextContent("Open")

    // And: All meal cards should be rendered
    const mealNames = screen.getAllByTestId("meal-card-meal-name")
    expect(mealNames.length).toBe(3)
    expect(mealNames[0]).toHaveTextContent("Roast Chicken")

    const mealPrices = screen.getAllByTestId("meal-card-meal-price")
    expect(mealPrices.length).toBe(3)
    expect(mealPrices[0]).toHaveTextContent("$12.99")

  });

  test('renders correctly when vendor is closed', () => {
    // Given: Vendor is closed (after closing time)
    const currentDate = new Date('2025-03-10T22:00:00')

    // When: The component is rendered
    render(
      <VendorDetails
        vendorWithMenu={mockVendorWithMenu}
        currentDate={currentDate}
      />,
      { wrapper: GluestackUIProvider }
    );

    // Then: It should show the vendor is closed
    expect(screen.getByTestId("vendor-details-vendor-name")).toHaveTextContent("Test Restaurant")
    expect(screen.getByTestId("vendor-details-vendor-open")).toHaveTextContent("Closed")
  });

})