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
    const [kirim, setKirim] = useState({
        fid_user: route.params.id,
        tanggal: moment().format('YYYY-MM-DD'),
        progress: []
    });

    const [data, setData] = useState([]);

    const sendTMP = () => {
        console.log(data);
        storeData('progress' + route.params.tipe, data);
        SweetAlert.showAlertWithOptions({
            title: MYAPP,
            subTitle: 'Data berhasil disimpan !',
            style: 'success',
            cancellable: true
        });
    }

    const sendData = () => {
        axios.post(apiURL + 'progress_add', {
            fid_user: route.params.user.id,
            progress: data.filter(i => i.cek > 0)
        }).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                storeData('progress' + route.params.tipe, res.data);
                showMessage({
                    message: 'Data berhasil di simpan !',
                    type: 'success'
                });
                navigation.goBack();
            }
        })
    }

    const __getData = () => {



        axios.post(apiURL + 'progress', {
            tipe: route.params.tipe,
            fid_user: route.params.user.id,
        }).then(res => {
            // console.log(res.data);
            setData(res.data)
            getData('progress' + route.params.tipe).then(p => {
                if (!p) {
                    setData(res.data)
                } else {
                    let tmp = [...p];
                    console.log(tmp);
                    setData(p);
                    // res.data.map((item, index) => {
                    //     tmp[index].cek = item.cek;
                    //     tmp[index].oke = item.oke;
                    //     tmp[index].tanggal = item.tanggal;
                    // })
                    // console.log(tmp)
                    // // setData(tmp);

                }
            })

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
            <MyHeader judul={'Progress ' + route.params.tipe} onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 20,
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={{
                        uri: user.foto_user
                    }} style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                    }} />
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[600],
                        fontSize: 15
                    }}>{user.first_name} {user.last_name}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 15
                    }}>{user.position}</Text>
                </View>

                <FlatList data={data} renderItem={({ item, index }) => {
                    return (

                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{

                                    fontFamily: fonts.primary[600],
                                    fontSize: 14,
                                }}>{item.judul} </Text>
                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    fontSize: 14,
                                }}>{item.tanggal} </Text>
                            </View>
                            <TouchableOpacity onPress={() => {


                                if (item.done > 0) {
                                    showMessage({
                                        type: 'danger',
                                        message: 'Maaf progress ini sudah di kirim ke admin !'
                                    })
                                } else {
                                    let tmp = [...data];
                                    tmp[index].cek = item.cek > 0 ? 0 : 1;
                                    tmp[index].done = item.done > 0 ? 0 : 1;
                                    tmp[index].tanggal = item.cek > 0 ? moment().format('YYYY-MM-DD') : null
                                    setData(tmp);

                                }

                            }} style={{
                                padding: 10,
                            }}>
                                <Icon type='ionicon' color={item.cek > 0 ? colors.success : colors.border} name='checkmark-circle' />
                            </TouchableOpacity>
                        </View>
                    )
                }} />

                <MyGap jarak={20} />
                <MyButton title="Save" onPress={sendTMP} />
                <MyGap jarak={20} />
                <MyButton title="Save and Send" warna={colors.secondary} onPress={sendData} />
                <MyGap jarak={40} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})