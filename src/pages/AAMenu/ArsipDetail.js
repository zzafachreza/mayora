import { Alert, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { MYAPP, apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
import moment from 'moment'
export default function ({ navigation, route }) {

    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            // padding: 10,
        }}>
            <MyHeader judul="Arsip Pengiriman Barang Detail" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 20,
            }}>


                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.black,
                    fontSize: 14,
                    marginBottom: 5,
                }}>{moment(item.tanggal).format('dddd, DD MMM YYYY')}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: 14
                    }}>Surat Jalan</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        fontSize: 14
                    }}>{item.surat_jalan}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: 14
                    }}>Kode</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        fontSize: 14
                    }}>{item.kode}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: 14
                    }}>Jenis</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        fontSize: 14
                    }}>{item.jenis}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: 14
                    }}>Jumlah</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        fontSize: 14
                    }}>{item.jumlah}</Text>
                </View>
                <MyGap jarak={20} />
                <MyButton onPress={() => {

                    Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                        {
                            text: 'TIDAK'
                        }, {
                            text: 'HAPUS',
                            onPress: () => {
                                axios.post(apiURL + 'arsip_delete', {
                                    id: item.id
                                }).then(res => {
                                    console.log(res.data);
                                    if (res.data == 200) {
                                        showMessage({
                                            message: 'Data berhasil di hapus !',
                                            type: 'success'
                                        });
                                        navigation.goBack();
                                    }
                                })
                            }
                        }
                    ])


                }} warna={colors.danger} title="Hapus" Icons="trash" colorText={colors.white} />



            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})