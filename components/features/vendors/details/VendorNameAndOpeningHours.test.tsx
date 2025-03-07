import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {VendorNameAndOpeningHours} from "@/components/features/vendors/details/VendorNameAndOpeningHours";
import {getTestVendor} from "@/components/features/vendors/testUtils";

describe('<VendorNameAndOpeningHours />', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  const vendor = getTestVendor()

  test('renders vendor name and opening hours correctly when open', () => {
    // Given: a vendor object and open status

    // When: The VendorNameAndOpeningHours is rendered
    render(
      <VendorNameAndOpeningHours
        currentVendor={vendor}
        isOpen={true}
      />,
      {wrapper: GluestackUIProvider}
    );

    // Then: The vendor details are displayed correctly
    expect(screen.getByText(vendor.name)).toBeOnTheScreen();
    expect(screen.getByText('8:00PM - 12:00AM')).toBeOnTheScreen();
    expect(screen.getByText('Open')).toBeOnTheScreen();
  });

  test('renders closed status correctly', () => {
    // Given: a vendor object with closed status

    // When: The VendorNameAndOpeningHours is rendered with isOpen false
    render(
      <VendorNameAndOpeningHours
        currentVendor={vendor}
        isOpen={false}
      />,
      {wrapper: GluestackUIProvider}
    );

    // Then: The closed status is displayed
    expect(screen.getByText('Closed')).toBeOnTheScreen();
  });

  test('handles undefined vendor gracefully', () => {
    // Given: no vendor provided

    // When: The VendorNameAndOpeningHours is rendered without a vendor
    render(
      <VendorNameAndOpeningHours isOpen={false} />,
      { wrapper: GluestackUIProvider }
    );

    // Then: The component renders a fallback message without errors
    expect(screen.getByText('No vendor available')).toBeOnTheScreen();
  });
});