import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LoginScreen(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //API Call to Authorise user
  const login = async () => {
    let payload = { email: email, password: password };
    try {
      let response = await axios.post(
        "http://localhost:8080/api/login",
        payload
      );

      if (response.data.accessTokens) {
        await AsyncStorage.setItem("accessTokens", response.data.accessTokens);
        navigation.navigate("Draw");
        // props.setLoggedIn(true);
      }
    } catch (err) {
      setErrorMessage("Incorrect login details, please try again!");
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
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
          // duration="5000"
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
          Welcome Back
        </Animatable.Text>
        <Text style={styles.textBody}>Log in to your existing Account</Text>
        {errorMessage ? (
          <Text style={styles.errors}>{errorMessage}</Text>
        ) : null}
      </View>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          name="email"
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signBtn}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
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
    marginTop: 40,
    backgroundColor: colors.primary,
  },

  signBtn: {
    width: "50%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    marginTop: 15,
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

  signupText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.grey,
  },
});

export default LoginScreen;
