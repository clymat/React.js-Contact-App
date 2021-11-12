import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AddScreen({ navigation, route, props }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    selectedValue: "",
    phone: "",
    occupation: "",
    business: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const clearForm = () => {
    setForm({
      name: "",
      email: "",
      type: "",
      phone: "",
      occupation: "",
      business: "",
      address: "",
    });
  };

  //Get Params from Contact Screen
  const populateForm = () => {
    const { edit, ...rest } = route.params;
    setForm(rest);
    setEditMode(edit);
  };

  useEffect(() => {
    if (route.params) {
      populateForm();
    }
  }, []);

  //API Call To Add Contact
  const addContact = async () => {
    const token = await AsyncStorage.getItem("accessTokens");
    let payload = {
      name: form.name,
      email: form.email,
      type: form.selectedValue,
      phone: form.phone,
      occupation: form.occupation,
      business: form.business,
      address: form.address,
    };
    const apiUrl = `http://localhost:8080/api/${
      editMode ? `contact/edit/${route.params.id}` : "contact/add"
    }`;
    let saveFunction = editMode ? axios.put : axios.post;

    let response = await saveFunction(apiUrl, payload, {
      headers: {
        Authorization: token,
      },
    });

    if (response.data) {
      navigation.navigate("Contacts");
      clearForm();
    } else {
      setErrorMessage("Please Check form fields are filled correctly!");
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View>
        {errorMessage ? (
          <Text style={styles.errors}>{errorMessage}</Text>
        ) : null}
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={form.name}
          name="name"
          placeholder="Full Name."
          placeholderTextColor="#A9A9A9"
          onChangeText={(name) => setForm({ ...form, name: name })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={form.email}
          name="email"
          placeholder="Email."
          placeholderTextColor="#A9A9A9"
          onChangeText={(email) => setForm({ ...form, email: email })}
        />
      </View>

      <Picker
        style={styles.containerPicker}
        selectedValue={form.selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) =>
          setForm({ ...form, selectedValue: itemValue })
        }
      >
        <Picker.Item label="Client" value="Client" />
        <Picker.Item label="Supplier" value="Supplier" />
      </Picker>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={form.phone}
          name="phone"
          placeholder="Phone Number"
          placeholderTextColor="#A9A9A9"
          onChangeText={(phone) => setForm({ ...form, phone: phone })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={form.occupation}
          name="occupation"
          placeholder="Occupation"
          placeholderTextColor="#A9A9A9"
          onChangeText={(occupation) =>
            setForm({ ...form, occupation: occupation })
          }
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={form.business}
          name="business"
          placeholder="Company"
          placeholderTextColor="#A9A9A9"
          onChangeText={(business) => setForm({ ...form, business: business })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={form.address}
          name="address"
          placeholder="Address"
          placeholderTextColor="#A9A9A9"
          onChangeText={(address) => setForm({ ...form, address: address })}
        />
      </View>

      <TouchableOpacity style={styles.signBtn} onPress={addContact}>
        <Text style={styles.signupText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signBtn} onPress={populateForm}>
        <Text style={styles.loginText}>Update</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputView: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    width: "70%",
    height: 35,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 40,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: "center",
  },

  signBtn: {
    width: "50%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.white,
    marginTop: 15,
  },

  containerPicker: {
    paddingTop: 40,
    marginBottom: 8,
    borderColor: colors.primary,
    alignItems: "center",
    marginBottom: 15,
  },

  signupText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.grey,
  },

  errors: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: colors.danger,
    color: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 0,
    flexDirection: "row",
    fontSize: 20,
  },
});
