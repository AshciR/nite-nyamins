import {fireEvent, render, screen, userEvent} from '@testing-library/react-native';

import HomeScreen from "./HomeScreen";

describe('<HomeScreen />', () => {
  test('Title renders correctly on HomeScreen', () => {
    // When: The home screen renders
    render(<HomeScreen />);

    // Then: Header should be present
    const header = screen.getByText('Street Vendor Tracker');
    expect(header).toBeOnTheScreen()
  });

  test('Vendors are on the HomeScreen', () => {
    // When: The home screen renders
    render(<HomeScreen />);

    // Then: Header should be present
    const vendors = screen.getAllByText(/Vendor \d+/);
    expect(vendors.length).toBe(5)
  });

  test("Toggle changes title", async () => {
    const user = userEvent.setup({delay: 1});

    // Given: Home screen has the default title
    render(<HomeScreen />);
    const title = screen.getByText('Street Vendor Tracker');
    expect(title).toBeOnTheScreen();

    // And: The toggle is defaulted to 'on'
    expect(screen.getByTestId("change-home-screen-title-switch")).toBeChecked()

    // When: We toggle the switch
    const titleToggle = screen.getByLabelText("change-home-screen-title-toggle")
    await user.press(titleToggle);

    // Then: The title should change
    expect(screen.queryByText('Street Vendor Tracker')).not.toBeOnTheScreen()
    expect(screen.getByText("Nite Nyammins")).toBeOnTheScreen()

    // And: The toggle is off
    expect(screen.getByTestId("change-home-screen-title-switch")).not.toBeChecked()
  });

  test('Hello World button should be present', () => {
    // When: The home screen renders
    render(<HomeScreen />);

    // Then: Button should be present
    const button = screen.getByRole('button', {name: "Hello World"});
    expect(button).toBeOnTheScreen()
  });

});
