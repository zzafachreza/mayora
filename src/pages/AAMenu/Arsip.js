import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyHeader, MyInput } from '../../components';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const isFocus = useIsFocused();

    const getDataTransaksi = () => {
        setLoading(true);
        axios.post(apiURL + 'arsip').then(res => {
            console.log(res.data);
            setData(res.data);
            setTMP(res.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (isFocus) {
            getDataTransaksi();
        }
    }, [isFocus]);

    const __renderItem = ({ item }) => {
        return (



            <View style={{
                borderWidth: 1,
                padding: 10,
                marginBottom: 10,
                width: '100%',
                position: 'relative',
                borderRadius: 10,
                overflow: 'hidden'
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

                <TouchableOpacity onPress={() => navigation.navigate('ArsipDetail', item)} style={{
                    width: 100,
                    height: 30,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black
                    }}>Detail</Text>
                </TouchableOpacity>
            </View>




        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Arsip Pengiriman Barang" onPress={() => navigation.goBack()} />



            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,

                }}>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flex: 0.5,
                            paddingRight: 5,
                        }}>
                            <MyButton onPress={() => navigation.navigate('ArsipAdd')} title="Tambah" Icons="duplicate" />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingTop: 10,
                        }}>
                            <View style={{
                                position: 'relative',

                            }}>
                                {key.length > 0 &&

                                    <TouchableWithoutFeedback onPress={() => {
                                        setKey(''); setData(TMP);
                                    }}>
                                        <View style={{
                                            position: 'absolute',
                                            zIndex: 99,
                                            top: 10,
                                            right: 10,
                                        }}>
                                            <Icon type='ionicon' name='close' color={colors.secondary} />
                                        </View>
                                    </TouchableWithoutFeedback>}
                                <View style={{
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                }}>
                                    <Icon type='ionicon' name='search' color={colors.primary} />
                                </View>
                                <TextInput value={key} onChangeText={x => {
                                    setKey(x);
                                    if (x.length > 0) {
                                        let TMPSrc = data.filter(i => i.kode.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                        if (TMPSrc.length > 0) {
                                            setData(TMPSrc);
                                        }
                                    } else {
                                        setData(TMP);
                                    }
                                }} placeholder='Pencarian . . .' style={{
                                    height: 45,
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    borderRadius: 30,
                                    paddingLeft: 40,
                                    borderColor: colors.primary,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4
                                }} />
                            </View>
                        </View>
                    </View>

                    <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})