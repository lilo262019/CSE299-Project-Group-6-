import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showAlert } from '../components/showAlert';
import BackBtn from '../components/BackBtn';
import Button from '../components/Button';

export default function Checkout({ navigation }) {
  const [country, setCountry] = useState("Hong Kong SAR China");
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isPaying, setIsPaying] = useState(false);
  const [user, setUser] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        if (!id) return;
        const userDataString = await AsyncStorage.getItem('user' + JSON.parse(id));
        if (userDataString) {
          const userFromStorage = JSON.parse(userDataString);
          setUser(userFromStorage);
          setUserLogin(true);
        }
      } catch (e) {
        setUserLogin(false);
      }
    };
    fetchUserData();
  }, []);

  const handlePay = () => {
    // Email required for all
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (paymentMethod === 'Credit Card') {
      const cardNum = cardNumber.replace(/\s+/g, '');
      if (!/^\d{12}$/.test(cardNum)) {
        showAlert('Invalid Card Number', 'Card number must be exactly 12 digits.');
        return;
      }
      if (!/^\d{3}$/.test(cvc)) {
        showAlert('Invalid CVC', 'CVC must be exactly 3 digits.');
        return;
      }
    }
    if (paymentMethod === 'Bkash') {
      if (!/^01\d{9}$/.test(bkashNumber)) {
        showAlert('Invalid Bkash Number', 'Please enter a valid 11-digit Bangladeshi phone number starting with 01.');
        return;
      }
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      showAlert('Payment Successful', `Paid with ${paymentMethod}`);
    }, 1200);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ position: 'relative', marginBottom: 20 }}>
        <BackBtn onPress={() => navigation && navigation.goBack ? navigation.goBack() : null} />
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={styles.title}>
            {userLogin && user ? user.username : 'Guest'}
          </Text>
          <Text style={styles.location}>
            {userLogin && user && user.location ? user.location : 'No location set'}
          </Text>
        </View>
      </View>

 
  <TextInput
    style={styles.input}
    placeholder="Email"
    keyboardType="email-address"
    value={email}
    onChangeText={setEmail}
    autoCapitalize="none"
    autoCorrect={false}
    id="checkout-email"
    name="email"
    autoComplete="email"
  />

      {paymentMethod === 'Credit Card' && (
        <View style={styles.cardContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="1234 1234 1234 1234"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            maxLength={16}
            id="checkout-card-number"
            name="cardNumber"
            autoComplete="cc-number"
          />
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 8 }}>
           <MaterialCommunityIcons name="credit-card" size={24} color="#1a1f71" />
<MaterialCommunityIcons name="credit-card-outline" size={24} color="#eb001b" style={{ marginLeft: 4 }} />
  </View>
        </View>
      )}

      {paymentMethod === 'Credit Card' && (
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.flex]} placeholder="MM / YY" keyboardType="numeric" id="checkout-card-expiry" name="cardExpiry" autoComplete="cc-exp" />
          <TextInput
            style={[styles.input, styles.flex]}
            placeholder="CVC"
            keyboardType="numeric"
            value={cvc}
            onChangeText={setCvc}
            maxLength={3}
            id="checkout-card-cvc"
            name="cvc"
            autoComplete="cc-csc"
          />
        </View>
      )}


      {paymentMethod === 'Credit Card' && (
  <TextInput style={styles.input} placeholder="Name on card" id="checkout-card-name" name="cardName" autoComplete="cc-name" />
      )}

      <View style={styles.pickerContainer}>
        <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>Choose Payment Method</Text>
        <Picker selectedValue={paymentMethod} onValueChange={setPaymentMethod}>
          <Picker.Item label="Credit Card/ Debit Card/ Visa" value="Credit Card" />
          <Picker.Item label="Bkash" value="Bkash" />
          <Picker.Item label="Cash on Delivery" value="Cash on Delivery" />
        </Picker>
      </View>

      {paymentMethod === 'Bkash' && (
        <TextInput
          style={styles.input}
          placeholder="Enter your Bkash phone number"
          keyboardType="numeric"
          value={bkashNumber}
          onChangeText={setBkashNumber}
          maxLength={11}
          id="checkout-bkash-number"
          name="bkashNumber"
          autoComplete="tel"
        />
      )}


    
  <Button title={isPaying ? "Paying..." : "Pay"} onPress={handlePay} isValid={!isPaying} loader={isPaying} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  location: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  flex: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginTop: 2,
  },
  payButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
