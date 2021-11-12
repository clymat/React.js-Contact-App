import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/screens/LoginScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import DrawerScreen from "./app/screens/DrawerScreen";
const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="login"
          children={() => (
            <LoginScreen loggedIn={loggedIn} setLoggedin={setLoggedIn} />
          )}
        ></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>

        <Stack.Screen name="Draw" component={DrawerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
