import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from './components/MainMenu.js';
import BarcodeScannerScreen from './components/BarcodeScanner.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
//change
const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="MainMenu"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#505357', // Set your desired color
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
        >
          <Stack.Screen name="Main Menu" component={MainMenuScreen} />
          <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
