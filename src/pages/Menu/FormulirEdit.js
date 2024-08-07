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
    TextInput,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar, MyHeader } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP, getData } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native';
export default function Pendaftaran({ navigation, route }) {




    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState(route.params);
    useEffect(() => {
        getData('user').then(uu => {
            setData({
                ...data,
                fid_user: uu.id,
                newfoto_keterangan: null
            })
        })
    }, [])
    const simpan = () => {


        console.log(data);
        if (
            data.jumlah.length === 0 &&
            data.pemesan.length === 0 &&
            data.ring.length === 0 &&
            data.pemesan.length === 0

        ) {
            showMessage({
                message: 'Formulir tidak boleh kosong !',
            });
        } else if (data.jumlah.length === 0) {
            showMessage({
                message: 'Masukan jumlah',
            });
        }

        else if (data.ring.length === 0) {
            showMessage({
                message: 'Masukan ring',
            });
        }
        else {

            console.log(data)

            // setLoading(true);
            axios
                .post(apiURL + 'update_formulir', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        });

                    } else {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        },
                            callback => navigation.navigate('MainApp'));

                    }


                });
        }
    };



    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.white,

                position: 'relative',


            }}>
            <MyHeader judul="Edit Formulir" />

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                <View style={{

                }}>
                    <Text style={{
                        fontSize: MyDimensi / 4,
                        fontFamily: fonts.primary[400],
                        color: colors.black,
                        marginBottom: 10,
                    }}>Silahkan masukan data formulir</Text>

                    {/* NAMA LENGKAP */}


                    {/* pemesan */}
                    <MyInput label='Pemesan' value={data.pemesan} onChangeText={x => setData({
                        ...data,
                        pemesan: x
                    })} iconname='person-outline' placeholder='masukan pemesan' />
                    <MyGap jarak={20} />
                    <MyInput label='Jumlah' onChangeText={x => setData({
                        ...data,
                        jumlah: x
                    })} value={data.jumlah} iconname='options-outline' placeholder='masukan jumlah' />
                    <MyGap jarak={20} />

                    {/* NOMOR ring */}
                    <MyInput label='Ring' onChangeText={x => setData({
                        ...data,
                        ring: x
                    })} value={data.ring} iconname='aperture-outline' placeholder='masukan ring' />
                    <MyGap jarak={20} />


                    {/* nama */}
                    <MyInput label='Nama' onChangeText={x => setData({
                        ...data,
                        nama: x
                    })} value={data.nama} iconname='card-outline' placeholder='masukan nama' />
                    <MyGap jarak={20} />
                    {/* NOMOR ring */}
                    <MyInput label='Nomor telepon' onChangeText={x => setData({
                        ...data,
                        telepon: x
                    })} value={data.telepon} iconname='logo-whatsapp' placeholder='masukan nomor telepon' />
                    <MyGap jarak={20} />

                    {/* NOMOR ring */}
                    <MyInput label='Nomor Seri' onChangeText={x => setData({
                        ...data,
                        nomor_seri: x
                    })} value={data.nomor_seri} iconname='ribbon-outline' placeholder='masukan nomor seri' />
                    <MyGap jarak={20} />


                    {/* NOMOR ring */}
                    <MyInput label='Warna' onChangeText={x => setData({
                        ...data,
                        warna: x
                    })} value={data.warna} iconname='color-palette-outline' placeholder='masukan warna' />

                    <MyGap jarak={20} />

                    {/* NOMOR ring */}
                    <MyInput label='Model' onChangeText={x => setData({
                        ...data,
                        model: x
                    })} value={data.model} iconname='cube-outline' placeholder='masukan model' />

                    <MyGap jarak={20} />
                    <MyInput onChangeText={x => setData({
                        ...data,
                        keterangan: x
                    })} value={data.keterangan} label="Keterangan" placeholder="Masukan keterangan" iconname='create-outline' />
                    <MyGap jarak={20} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 4,
                        color: colors.black,
                        marginBottom: 10,
                    }}>Gambar</Text>
                    <TouchableWithoutFeedback onPress={() => {
                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 500,
                            maxHeight: 500
                        }, response => {
                            // console.log('All Response = ', response);

                            setData({
                                ...data,
                                newfoto_keterangan: `data:${response.type};base64, ${response.base64}`,
                            });
                        });
                    }}>
                        <View style={{
                            backgroundColor: colors.border,
                            borderRadius: 10,
                            overflow: 'hidden'
                        }}>
                            <Image style={{
                                width: '100%',
                                height: 200,
                                resizeMode: 'contain'
                            }} source={{
                                uri: data.newfoto_keterangan !== null ? data.newfoto_keterangan : data.foto_keterangan,
                            }} />
                        </View>
                    </TouchableWithoutFeedback>




                </View>
                <MyGap jarak={20} />




                {!loading &&
                    <>
                        <MyButton


                            title="Simpan"
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
                    <ActivityIndicator color={colors.secondary} size="large" />
                </View>}
                <MyGap jarak={40} />
            </ScrollView>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 20,
        position: 'relative',

    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});