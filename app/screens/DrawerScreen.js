import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Dimensions, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";

import MainTabScreen from "./MainTabScreen";

const Drawer = createDrawerNavigator();

export default function DrawerScreen(props) {
  const signOut = () => {
    props.navigation.navigate("login");
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <Image
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
          source={require("../assets/clean_textile_@2x.png")}
        />
        <DrawerItem
          style={{ backgroundColor: colors.secondary }}
          icon={({ color, size }) => (
            <Icon name="eye-outline" color={colors.primary} size={size} />
          )}
          label="View Contacts"
          onPress={() => {
            props.navigation.navigate("Contacts");
          }}
        />

        <DrawerItem
          style={{ backgroundColor: colors.primary }}
          icon={({ color, size }) => (
            <Icon
              name="person-add-outline"
              color={colors.secondary}
              size={size}
            />
          )}
          label="Add Contacts"
          onPress={() => {
            props.navigation.navigate("Add");
          }}
        />

        <DrawerItem
          style={{ backgroundColor: colors.secondary }}
          icon={({ color, size }) => (
            <Icon
              name="close-circle-outline"
              color={colors.primary}
              size={size}
            />
          )}
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          style={{ backgroundColor: colors.primary }}
          icon={({ color, size }) => (
            <Icon name="toggle-outline" color={colors.secondary} size={size} />
          )}
          label="Toogle drawer"
          onPress={() => props.navigation.toggleDrawer()}
        />
        <DrawerItem
          style={{ backgroundColor: colors.secondary }}
          icon={({ color, size }) => (
            <Icon name="log-out-outline" color={colors.primary} size={size} />
          )}
          label="Sign Out"
          onPress={signOut}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainTab" component={MainTabScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
