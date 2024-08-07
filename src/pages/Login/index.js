import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking, ImageBackground } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';

export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    email: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);

  const masuk = () => {
    if (kirim.email == null && kirim.password == null) {
      Alert.alert(MYAPP, 'email dan Password tidak boleh kosong !');
    } else if (kirim.email == null) {
      Alert.alert(MYAPP, 'email tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {
      setLoading(true);
      console.log(kirim);
      axios.post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }
        });
    }
  }

  useEffect(() => {
    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 0,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, position: "relative" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: colors.white
        }}>
          <Animated.Image source={require('../../assets/logo.png')} style={{
            marginTop: 10,
            width: windowWidth / 1.9,
            height: windowWidth / 1.9,
            resizeMode: 'contain',
            alignSelf: "center"
          }} />
          <Animated.View style={{
            padding: 0,
            margin: 0,
            bottom: card,
            borderRadius: 10,
            alignItems: 'center', // Center the white background view
          }}>
            <View style={{
              width: '100%', // Set the width to full screen
              padding: 20,
              backgroundColor: 'white',
            }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: fonts.primary[600],
                fontSize: MyDimensi / 2.5,
                marginTop: 0
              }}>
                LOGIN
              </Text>
              <MyGap jarak={50} />
              <MyInput label="Email" onChangeText={x => {
                setKirim({
                  ...kirim,
                  email: x
                })
              }} iconname="mail" placeholder="Enter your email" />
              <MyGap jarak={20} />
              <MyInput label="Password" onChangeText={x => {
                setKirim({
                  ...kirim,
                  password: x
                })
              }} iconname="key" placeholder="Enter your password" secureTextEntry={true} />
              <TouchableOpacity onPress={() => {
                let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa password . . .`;
                Linking.openURL(urlWA)
              }} style={{ marginTop: 0 }}>
                <Text style={{
                  textAlign: 'right',
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  fontSize: MyDimensi / 4,
                  marginTop: 10,
                }}>Forgot Password?</Text>
              </TouchableOpacity>
              <MyGap jarak={40} />
              <MyGap jarak={0} />
              {!loading &&
                <MyButton
                  onPress={masuk}
                  title="Login"
                  Icons="log-in-outline"
                />
              }
              {loading &&
                <ActivityIndicator size="large" color={colors.primary} />
              }

              {!loading &&
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                  <View style={{
                    marginTop: 20,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      fontSize: MyDimensi / 4,
                      fontFamily: fonts.primary[400],
                      textAlign: 'center',
                      color: colors.black
                    }}>Don't have an account yet?  <Text style={{
                      fontSize: MyDimensi / 4,
                      fontFamily: fonts.primary[600],
                      textAlign: 'center',
                      color: colors.black
                    }}>Register</Text></Text>
                  </View>
                </TouchableWithoutFeedback>}
              <View style={{ marginTop: '50%' }}></View>
            </View>
          </Animated.View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
