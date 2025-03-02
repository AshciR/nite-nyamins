import {NavigationContainer} from "@react-navigation/native";
import {render, screen, userEvent} from "@testing-library/react-native";
import MainNavigator from "@/components/screens/MainNavigator";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Create a wrapper that provides navigation context
const NavigationProvider = ({children}) => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{children}</NavigationContainer>
    </QueryClientProvider>
  )
};

describe('MainNavigator', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('renders Home screen by default', async () => {

    // When: The navigator renders
    render(<MainNavigator/>, {wrapper: NavigationProvider});

    // Then: Expect the Home screen to be visible (make sure Home renders identifiable text)
    const homeScreenText = await screen.findByText('Home');
    expect(homeScreenText).toBeOnTheScreen();

  });

  test('navigate to vendor screen', async () => {

    const user = userEvent.setup({delay: 1});

    // Given: The navigator renders
    render(<MainNavigator/>, {wrapper: NavigationProvider});

    // When: The Vendor tab is clicked
    const vendorTabButtons = await screen.findAllByTestId("vendors-tab-button")
    await user.press(vendorTabButtons[0]) // Ionicons

    // Then: Expect the Home screen to be visible (make sure Home renders identifiable text)
    const vendorsScreenText = await screen.findByText('Vendors Screen')
    expect(vendorsScreenText).toBeOnTheScreen()

  });

})