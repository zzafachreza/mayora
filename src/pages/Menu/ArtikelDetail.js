import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
import moment from 'moment'
export default function ArtikelDetail({ navigation, route }) {

    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            // padding: 10,
        }}>
            <MyHeader judul="Formulir Detail" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
            }}>


                <View style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.white,
                    marginVertical: 5,

                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 12,
                                }}>Pemesan</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                }}>{item.pemesan}</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 12,
                                }}>Jumlah</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                }}>{item.jumlah}</Text>
                            </View>


                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 12,
                                }}>Nama</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                }}>{item.nama}</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 12,
                                }}>No. Telepon</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                }}>{item.telepon}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={{
                        marginTop: 10,
                        borderTopWidth: 1,
                        borderColor: colors.primary,
                        paddingTop: 10,
                        flexDirection: 'row',
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: 12,
                            }}>Ring</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                            }}>{item.ring}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: 12,
                            }}>Warna</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                            }}>{item.warna}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: 12,
                            }}>Model</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                            }}>{item.model}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, marginTop: 20, }}>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: 12,
                        }}>Status</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>{item.status_formulir}</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 20, }}>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: 12,
                        }}>Nomor Seri</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>{item.nomor_seri}</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 20, }}>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: 12,
                        }}>Keterangan</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>{item.keterangan}</Text>
                    </View>
                    <Text style={{
                        marginTop: 20,
                        fontFamily: fonts.secondary[800],
                        fontSize: 12,
                        marginBottom: 10,
                    }}>Gambar</Text>
                    <Image source={{
                        uri: item.image
                    }} style={{
                        // flex: 1,
                        width: '100%',
                        height: 300,
                        resizeMode: 'contain'
                    }} />
                    <MyGap jarak={20} />
                    <MyButton warna={colors.primary} onPress={() => navigation.replace("FormulirEdit", item)} title="Edit Formulir" Icons="create-outline" />
                </View>



            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})