import {Routes, RoutesNames} from "@/components/screens/routes";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from "@/components/screens/HomeScreen";
import VendorScreen from "@/components/screens/VendorScreen";
import {lightBackground, primary, secondary} from "@/color.constants";

const Tab = createBottomTabNavigator<Routes>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle:{
          backgroundColor: lightBackground,
        },
        tabBarIcon: ({color, size}) => {
          const iconName: string = route.name === RoutesNames.MAP ? 'map' : 'fast-food';
          return <Ionicons
            name={iconName}
            size={size}
            color={color}
            testID={`${route.name.toLowerCase()}-tab-button`}
          />;
        },
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: secondary,
      })}
    >
      <Tab.Screen name={RoutesNames.MAP} component={HomeScreen}/>
      <Tab.Screen name={RoutesNames.VENDOR} component={VendorScreen}/>
    </Tab.Navigator>
  );
};

export default MainNavigator;