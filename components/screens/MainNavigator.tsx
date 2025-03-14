import {Routes, RoutesNames} from "@/components/screens/routes";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from "@/components/screens/HomeScreen";
import VendorScreen from "@/components/screens/VendorScreen";
import {primary} from "@/color.constants";

const Tab = createBottomTabNavigator<Routes>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          const iconName: string = route.name === 'Home' ? 'map' : 'fast-food';
          return <Ionicons
            name={iconName}
            size={size}
            color={color}
            testID={`${route.name.toLowerCase()}-tab-button`}
          />;
        },
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name={RoutesNames.HOME} component={HomeScreen}/>
      <Tab.Screen name={RoutesNames.VENDORS} component={VendorScreen}/>
    </Tab.Navigator>
  );
};

export default MainNavigator;