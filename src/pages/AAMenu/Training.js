import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { MYAPP, apiURL, getData, storeData, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'
import { Icon } from 'react-native-elements'

import SweetAlert from 'react-native-sweet-alert';
export default function ({ navigation, route }) {
    const user = route.params.user;
    const [open, setOpen] = useState(false);
    const [kirim, setKirim] = useState({
        fid_user: route.params.user.id,
        tanggal: moment().format('YYYY-MM-DD'),
        info: 'Hadir'
    });

    const [data, setData] = useState({
        judul: '',
        tanggal: moment().format('YYYY-MM-DD'),
        ruangan: '',
        cek: 0,
        keterangan: '',
    });

    const sendTMP = () => {
        console.log(data);
        storeData('jadwal' + route.params.tipe, kirim.info);
        SweetAlert.showAlertWithOptions({
            title: MYAPP,
            subTitle: 'Data berhasil disimpan !',
            style: 'success',
            cancellable: true
        });
    }

    const sendData = () => {
        axios.post(apiURL + 'jadwal_add', kirim).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                showMessage({
                    message: 'Data berhasil di simpan !',
                    type: 'success'
                });
                navigation.goBack();
            }
        })
    }

    const __getData = () => {





        axios.post(apiURL + 'jadwal', {
            tipe: route.params.tipe,
            fid_user: route.params.user.id,
            tanggal: moment().format('YYYY-MM-DD')
        }).then(res => {
            console.log(res.data);


            if (res.data.length > 0) {
                setOpen(true)
                getData('jadwal' + route.params.tipe).then(jadwal => {
                    if (!jadwal) {
                        setKirim({
                            ...kirim,
                            info: 'Hadir',
                            fid_jadwal: res.data[0].id
                        })
                    } else {
                        setKirim({
                            ...kirim,
                            info: jadwal,
                            fid_jadwal: res.data[0].id
                        })
                    }
                })
                setData(res.data[0]);

            } else {
                setOpen(false);
                showMessage({
                    message: 'There is no schedule today !'
                });

            }

        })
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getData();
        }
    }, [isFocused])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            // padding: 10,
        }}>
            <MyHeader judul={'Schedule ' + route.params.tipe} onPress={() => navigation.goBack()} />

            {
                open && <View style={{
                    padding: 20,
                    flex: 1,
                }}>

                    <View style={{
                        flex: 1,
                    }}>
                        {route.params.tipe == 'Training' &&
                            <View style={{
                                borderWidth: 1,
                                borderColor: colors.border,
                                padding: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{

                                    fontFamily: fonts.primary[600],
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}>{data.judul} </Text>
                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}>{moment(data.tanggal).format('dddd, DD MMMM YYYY ')} </Text>

                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 15,
                                    textAlign: 'center',
                                    color: colors.danger
                                }}>{data.ruangan} </Text>


                            </View>
                        }
                        {
                            route.params.tipe == 'GKM' &&

                            <View style={{
                                borderWidth: 1,
                                borderColor: colors.border,
                                padding: 10,
                            }}>
                                <RenderHtml
                                    contentWidth={windowWidth}

                                    source={{
                                        html: data.keterangan
                                    }}
                                />
                            </View>
                        }
                        {data.cek == 0 &&

                            <View style={{
                                marginTop: 30,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <TouchableOpacity onPress={() => setKirim({
                                    ...kirim,
                                    info: 'Hadir'
                                })} style={{
                                    borderRadius: 10,
                                    width: windowWidth / 2.5,
                                    height: 40,
                                    backgroundColor: kirim.info == 'Hadir' ? colors.secondary : colors.foourty,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                        fontSize: 15,
                                        color: kirim.info == 'Hadir' ? colors.white : colors.black
                                    }}>Hadir</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setKirim({
                                    ...kirim,
                                    info: 'Tidak Hadir'
                                })} style={{
                                    borderRadius: 10,
                                    width: windowWidth / 2.5,
                                    height: 40,
                                    backgroundColor: kirim.info == 'Tidak Hadir' ? colors.secondary : colors.foourty,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                        fontSize: 15,
                                        color: kirim.info == 'Tidak Hadir' ? colors.white : colors.black
                                    }}>Tidak Hadir</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {data.cek > 0 &&

                            <View style={{
                                marginTop: 30,

                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: colors.border,
                                }}>Attendance has been sent to admin !</Text>
                            </View>
                        }
                    </View>
                    {data.cek == 0 &&
                        <>
                            <MyGap jarak={20} />
                            <MyButton title="Save" onPress={sendTMP} />
                            <MyGap jarak={20} />
                            <MyButton title="Save and Send" warna={colors.secondary} onPress={sendData} />
                        </>

                    }
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})