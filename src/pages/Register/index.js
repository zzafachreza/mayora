import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar, MyCalendarSecond } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Register({ navigation }) {




    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState({
        api_token: api_token,
        nik: '',
        email: '',
        first_name: '',
        last_name: '',
        position: '',
        password: '',
        repassword: '',


    });

    const simpan = () => {


        console.log(data);
        if (
            data.first_name.length === 0 &&
            data.email.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Form cannot empty !',
            });
        } else if (data.first_name.length === 0) {
            showMessage({
                message: 'Please enter your first name',
            });
        }

        else if (data.email.length === 0) {
            showMessage({
                message: 'Please enter your email',
            });
        }
        else if (data.password.length === 0) {
            showMessage({
                message: 'Please enter your password',
            });
        } else if (data.repassword.length === 0) {
            showMessage({
                message: 'Please re-enter your password',
            });
        } else {



            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    } else {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    }


                });
        }
    };



    return (

        <View
            style={{ flex: 1, backgroundColor: colors.white, position: "relative" }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
                <ImageBackground style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',

                }}>


                    <View style={{
                        padding: 20,
                        width: '100%'


                    }}>
                        <Text style={{
                            fontSize: MyDimensi / 2.5,
                            fontFamily: fonts.primary[600],
                            color: colors.black,
                            textAlign: 'center'
                        }}>REGISTER</Text>

                        {/* NAMA LENGKAP */}
                        <MyInput label='NIK' onChangeText={x => {
                            setData({
                                ...data,
                                nik: x
                            })
                        }} iconname='card' placeholder='Enter NIK' />
                        <MyGap jarak={10} />
                        {/* NAMA LENGKAP */}
                        <MyInput label='First Name' onChangeText={x => {
                            setData({
                                ...data,
                                first_name: x
                            })
                        }} iconname='person' placeholder='Enter first name' />
                        <MyGap jarak={10} />
                        <MyInput label='Last Name' onChangeText={x => {
                            setData({
                                ...data,
                                last_name: x
                            })
                        }} iconname='person' placeholder='Enter last name' />
                        <MyGap jarak={10} />

                        <MyInput label='Email' onChangeText={x => {
                            setData({
                                ...data,
                                email: x
                            })
                        }} iconname='mail' placeholder='Enter email' />
                        <MyGap jarak={10} />


                        <MyInput label='Position' onChangeText={x => {
                            setData({
                                ...data,
                                position: x
                            })
                        }} iconname='ribbon' placeholder='Enter position' />
                        <MyGap jarak={10} />




                        {/*INPUT KATA SANDI */}
                        <MyInput
                            placeholder="Enter password"
                            label="Password"
                            iconname="lock-closed"
                            value={data.password}
                            secureTextEntry={true}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    password: value,
                                })
                            }
                        />


                        {/* INPUT KATA SANDI ULANG */}
                        <MyGap jarak={10} />
                        <MyInput
                            borderColor={sama ? colors.primary : colors.danger}
                            borderWidth={sama ? 1 : 1}
                            placeholder="Re-enter password"
                            label="Re-enter password"
                            iconname="lock-closed"
                            secureTextEntry
                            value={data.repassword}
                            onChangeText={value => {

                                if (value !== data.password) {
                                    setSama(false)
                                } else {
                                    setSama(true)
                                }

                                setData({
                                    ...data,
                                    repassword: value,
                                })
                            }

                            }
                        />
                        <MyGap jarak={20} />

                        {!loading &&
                            <>
                                <MyButton


                                    title="Register"
                                    Icons="log-in"
                                    onPress={simpan}
                                />

                            </>
                        }

                        {loading && <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ActivityIndicator color={colors.primary} size="large" />
                        </View>}

                        <View style={{ marginTop: '40%' }}>
                        </View>




                        <MyGap jarak={10} />

                    </View>

                </ImageBackground>
            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    page: {
        flexGrow: 1



    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
