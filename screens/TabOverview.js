import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CameraScreen } from "./tabs/CameraScreen";
import { MessageScreen } from "./tabs/MessageScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tabs = createBottomTabNavigator();
export const TabOverview = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Camera"
      screenOptions={({route}) => ({
        activeTintColor: 'tomato',
        fullScreenSwipeEnabled: true,
        inactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFC00',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      })}>
      <Tabs.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <MaterialIcons name="message" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="photo-camera" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
