import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import colors from "../config/colors";
import axios from "axios";

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //API call to register user
  const register = async () => {
    const apiUrl = "http://localhost:8080/api/register";

    let payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    let response = await axios.post(apiUrl, payload);
    const feedback = response.data;
    if (feedback) {
      navigation.navigate("login");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } else {
      setErrorMessage("Please Check form fields are filled correctly!");
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.topContainer}>
        <Animatable.Image
          animation="bounceIn"
          style={styles.image}
          source={require("../assets/logo_small.png")}
          resizeMode="center"
        />
        <Animatable.Text
          style={styles.textTitle}
          animation="shake"
          duration={1500}
          easing="linear"
        >
          Register
        </Animatable.Text>
        <Text style={styles.textBody}>
          Fill in all fields to avoid errors!!
        </Text>

        {errorMessage ? (
          <Text style={styles.errors}>{errorMessage}</Text>
        ) : null}
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          name="firstName"
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          onChangeText={(firstName) => setFirstName(firstName)}
          onEndEditing={(e) => handleValidEntry(e.nativeEvent.text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          name="lastName"
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          onChangeText={(lastName) => setLastName(lastName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          name="email"
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={register}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("login");
        }}
      >
        <Text style={styles.loginText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 400,
    height: 120,
    marginVertical: 10,
  },

  inputView: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: "center",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "50%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: colors.primary,
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

  textTitle: {
    fontSize: 40,
    color: colors.secondary,
    marginVertical: 10,
    fontWeight: 600,
  },

  textBody: {
    fontSize: 12,
    marginBottom: 15,
    color: colors.primary,
  },

  topContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.white,
  },
});
