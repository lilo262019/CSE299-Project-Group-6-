import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES, images } from "../../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);

  const logout = () => {
    console.log("Logout pressed");
    // Add logout logic here
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => console.log("Delete account pressed"),
          style: "destructive",
        },
      ]
    );
  };

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
    console.log("Dark Theme toggled:", !darkTheme);
  };

  const clearCache = () => {
    console.log("Clear Cache pressed");
    // Add cache clearing logic here
  };

  const goToOnlineAccount = () => {
    console.log("Navigating to Online Account");
    router.push("/account");
  };

  const upgradeAccount = () => {
    console.log("Navigating to Upgrade");
    router.push("/upgrade");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.profileContainer}>
        <Image
          source={user?.avatar ? { uri: user.avatar } : images.profile}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user?.username || "Guest User"}</Text>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => router.navigate("Favorites")}>
          <MaterialCommunityIcons name="heart-outline" color={COLORS.primary} size={24} />
          <Text style={styles.optionText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => router.navigate("Orders")}>
          <MaterialCommunityIcons name="truck-delivery" color={COLORS.primary} size={24} />
          <Text style={styles.optionText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => router.navigate("Cart")}>
          <SimpleLineIcons name="bag" color={COLORS.primary} size={24} />
          <Text style={styles.optionText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={toggleDarkTheme}>
          <Text style={styles.optionText}>Dark Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={clearCache}>
          <Text style={styles.optionText}>Clear Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={goToOnlineAccount}>
          <Text style={styles.optionText}>Online Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={upgradeAccount}>
          <Text style={styles.optionText}>Upgrade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={logout}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={deleteAccount}>
          <Text style={[styles.optionText, { color: "red" }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  username: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginTop: 10,
  },
  optionContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginLeft: 10,
  },
});

export default Profile;
