import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ContactsScreen(props) {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [value, setValue] = useState(false);

  //Filter Supplier Contacts
  const filterSuppliers = () => {
    const matchingContacts = contacts.filter(function (contact) {
      return contact.type === "Supplier";
    });

    setContacts(matchingContacts);
    setIsLoading(false);
  };

  //Filter Client Contacts
  const filterClients = () => {
    const matchingContacts = contacts.filter(function (contact) {
      return contact.type === "Client";
    });

    setContacts(matchingContacts);
  };

  const handleChange = (text) => {
    setText(text);

    const matchingContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(text);
    });

    setContacts(matchingContacts);
  };

  //API call to get the contacts that belong to Users Business
  const getContacts = async () => {
    setIsLoading(true);
    const apiUrl = `http://localhost:8080/api/contact`;
    const token = await AsyncStorage.getItem("accessTokens");
    let response = await axios.get(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    const contacts = response.data;
    setContacts(contacts);
    setIsLoading(false);
  };

  //Activity Indicator
  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  //Search Bar
  const renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={handleChange}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    );
  };

  //Delete Function
  const handleDelete = async (id) => {
    const apiUrl = `http://localhost:8080/api/contact/${id}`;
    const token = await AsyncStorage.getItem("accessTokens");

    let response = await axios.delete(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    setContacts(
      contacts.filter((contact) => {
        return contact.id !== id;
      })
    );

    Alert.alert("Success!", "Contact has been deleted!");
  };

  //Mount Contacts Page Up
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.filterButton}>
        <Text styles={styles.title}>Filter your Contacts </Text>
        <Button
          style={styles.filterButton}
          title="Clients"
          onPress={filterClients}
        />
        <Button
          style={styles.filterButtons}
          title="Suppliers"
          onPress={filterSuppliers}
        />

        <Button
          style={styles.filterButtons}
          title="Refresh"
          onPress={getContacts}
        />
      </View>
      <View>{renderHeader()}</View>
      {/* </View> */}
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.itemWrapperStyle} />}
        data={contacts}
        KeyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contentWrapperStyle}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Add", { ...item, edit: true })
              }
            >
              <Text style={styles.txtNameStyle}>{item.name}</Text>

              <Text style={styles.txtEmailStyle}>Email: {item.email}</Text>
              <Text>Type: {item.type}</Text>
              <Text>Phone: {item.phone}</Text>
              <Text>Occupation: {item.occupation}</Text>
              <Text>Company: {item.business}</Text>
              <Text>Address: {item.address}</Text>
            </TouchableOpacity>

            <Pressable
              style={styles.button}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.btnText}>Delete</Text>
            </Pressable>
            <Text style={styles.edit}>Or click on contact to edit</Text>
          </View>
        )}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderColor: colors.secondary,
  },

  contentWrapperStyle: {
    justifyContent: "space-around",
  },

  txtNameStyle: {
    fontSize: 20,
    fontWeight: "700",
  },

  txtEmailStyle: {
    color: colors.primary,
    fontWeight: 600,
  },

  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },

  button: {
    width: "50%",
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.danger,
  },

  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.white,
  },

  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },

  title: {
    align: "center",
    textAlign: "center",
    marginBottom: 3,
    marginVertical: 8,
  },
  filterButton: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: colors.secondary,
  },

  edit: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 600,
    alignSelf: "center",
    marginTop: 10,
  },
});
