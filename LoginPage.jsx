import { Formik } from 'formik';
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import { BackBtn, Button, TxtInput } from "../components";
import { COLORS } from "../constants"; // Ensure COLORS is imported
import styles from './login.style';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  email: Yup.string()
    .email('Provide a valid email address')
    .required('Required'),
});

const LoginPage = ({ navigation }) => {
  const [obscureText, setObscureText] = useState(true);

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.cover}
          />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(
                    touched.email
                      ? COLORS.secondary
                      : COLORS.lightGray // Fix: use COLORS.lightGray, not lightGrey
                  )}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TxtInput
                      placeholder="Enter email"
                      onFocus={() => setFieldTouched('email')}
                      onBlur={() => setFieldTouched('email')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(
                    touched.password
                      ? COLORS.secondary
                      : COLORS.lightGray // Fix: use COLORS.lightGray, not lightGrey
                  )}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TxtInput
                      placeholder="Enter password"
                      onFocus={() => setFieldTouched('password')}
                      onBlur={() => setFieldTouched('password')}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      secureTextEntry={obscureText}
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => setObscureText(!obscureText)}>
                      <MaterialCommunityIcons
                        name={obscureText ? "eye-off-outline" : "eye-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <Button title="LOGIN" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
