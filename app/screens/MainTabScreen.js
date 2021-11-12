import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import ContactsScreen from "./ContactsScreen";
import AddScreen from "./AddScreen";
import colors from "../config/colors";

const ContactsStack = createStackNavigator();
const AddStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Contacts" activeColor="#fff">
    <Tab.Screen
      name="Contacts"
      component={ContactsStackScreen}
      options={{
        title: "View Contacts",
        tabBarLabel: "Contacts",
        tabBarColor: colors.primary,
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
      }}
    />

    <Tab.Screen
      name="Add"
      component={AddScreen}
      options={{
        title: "Add Contacts",
        tabBarLabel: "Add Contacts",
        tabBarColor: colors.primary,
        tabBarIcon: ({ color }) => (
          <Icon name="add-circle-outline" color={color} size={27} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const ContactsStackScreen = ({ navigation }) => (
  <ContactsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ContactsStack.Screen
      name="Contacts"
      component={ContactsScreen}
      options={{
        title: "View Contacts",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009dff"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerRight: () => (
          <Icon.Button
            name="arrow-forward-outline"
            size={25}
            backgroundColor="#009dff"
            onPress={() => navigation.navigate("Add")}
          ></Icon.Button>
        ),
      }}
    />
  </ContactsStack.Navigator>
);

const AddStackScreen = ({ navigation }) => (
  <AddStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <AddStack.Screen
      name="Add"
      component={AddScreen}
      options={{
        title: "Add Contacts",
        headerLeft: () => (
          <Icon.Button
            name="arrow-back-outline"
            size={25}
            backgroundColor="#009dff"
            onPress={() => navigation.navigate("Contacts")}
          ></Icon.Button>
        ),
        headerRight: () => (
          <Icon.Button
            name="refresh-outline"
            size={25}
            backgroundColor="#009dff"
            onPress={() => navigation.navigate("Contacts")}
          ></Icon.Button>
        ),
      }}
    />
  </AddStack.Navigator>
);
