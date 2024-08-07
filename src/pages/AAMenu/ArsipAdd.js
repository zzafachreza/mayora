import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
import moment from 'moment'
export default function ({ navigation, route }) {

    const [kirim, setKirim] = useState({
        surat_jalan: '',
        tanggal: moment().format('YYYY-MM-DD'),
        jenis: '',
        kode: '',
        jumlah: '',
    });

    const sendData = () => {
        axios.post(apiURL + 'arsip_add', kirim).then(res => {
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

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            // padding: 10,
        }}>
            <MyHeader judul="Stock Opname Tambah" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 20,
            }}>
                <MyInput label="Surat Jalan" onChangeText={x => setKirim({
                    ...kirim,
                    surat_jalan: x
                })} icon={false} />
                <MyGap jarak={10} />
                <MyCalendar label="Tanggal" value={kirim.tanggal} onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal: x
                    })
                }} />
                <MyGap jarak={10} />
                <MyInput label="Jenis" onChangeText={x => setKirim({
                    ...kirim,
                    jenis: x
                })} icon={false} />
                <MyGap jarak={10} />
                <MyInput label="Kode" onChangeText={x => setKirim({
                    ...kirim,
                    kode: x
                })} icon={false} />
                <MyGap jarak={10} />
                <MyInput label="Jumlah" onChangeText={x => setKirim({
                    ...kirim,
                    jumlah: x
                })} keyboardType='number-pad' icon={false} />
                <MyGap jarak={20} />
                <MyButton title="Simpan" onPress={sendData} />



            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})