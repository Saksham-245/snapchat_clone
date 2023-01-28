import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Intro} from './screens/Intro';
import {TabOverview} from './screens/TabOverview';
import ImagePreview from './screens/tabs/ImagePreview';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabOverview}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Preview"
          component={ImagePreview}
          options={{
            headerTransparent: true,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
