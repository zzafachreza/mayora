import { Alert, StyleSheet, Text, View, Image, Modal, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, Pressable } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import { MyGap, MyHeader } from '../../components';
import GetLocation from 'react-native-get-location';
import ProgressCircle from 'react-native-progress-circle'
export default function Home({ navigation, route }) {

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({
    awal: '',
    akhir: '',
    countdown: '',
    syl: 0,
    gkm: 0,
    dttrn: {
      judul: ''
    },
    dtgkm: {
      judul: '',
    },
    sctrn: 0,
    scgkm: 0,
  })


  const _getTransaction = async () => {
    getData('user').then(u => {
      setUser(u);
      axios.post(apiURL + 'countdown', {
        fid_user: u.id
      }).then(res => {
        console.log(res.data);

        if (res.data.sctrn > 0) {
          setIsVisible(true)
        }

        if (res.data.scgkm > 0) {
          setIsVisible2(true)
        }
        setCountdown(res.data)
      })
    });


  }


  useEffect(() => {




    axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });


    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);




  return (

    <SafeAreaView style={{
      flex: 1,



    }}>

      {/* HEADERS */}
      <View style={{
        flexDirection: "row",
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center'


      }}>
        <View style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={{
            uri: user.foto_user
          }} style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }} />
        </View>
        <View style={{
          flex: 1,
        }}>
          <Text style={{ fontFamily: fonts.primary[400], fontSize: 16, color: colors.white, }}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={{ fontFamily: fonts.primary[800], fontSize: 16, color: colors.white, }}>
            {user.position}
          </Text>

        </View>



      </View>


      <View style={{
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
      }}>

        <View style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.primary
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{
              flex: 1,
              fontFamily: fonts.secondary[600],
              fontSize: 14
            }}>Join Date</Text>
            <Text style={{
              fontFamily: fonts.secondary[800],
              fontSize: 14
            }}>{moment(countdown.awal).format('DD/MM/yyyy')}</Text>
          </View>
          <View style={{
            marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{
              flex: 1,
              fontFamily: fonts.secondary[600],
              fontSize: 14
            }}>End Probation</Text>
            <Text style={{
              fontFamily: fonts.secondary[800],
              fontSize: 14
            }}>{moment(countdown.akhir).format('DD/MM/yyyy')}</Text>
          </View>
          <Text style={{
            marginTop: 10,
            textAlign: 'center',
            fontFamily: fonts.secondary[800],
            fontSize: 20
          }}>Countdown</Text>
          <Text style={{
            marginTop: 5,
            textAlign: 'center',
            fontFamily: fonts.secondary[600],
            fontSize: 18
          }}>{countdown.countdown}</Text>
        </View>

        {/* PROGRES */}
        <TouchableOpacity onPress={() => {
          navigation.navigate('Progress', {
            user: user,
            tipe: 'Syllabus'
          })
        }}>
          <>
            <View style={{
              marginTop: 10,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 10,
            }}>
              <Text style={{
                color: colors.white,
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: 16,
              }}>Progress Syllabus</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
              <View style={{
                flex: 1,
              }}>
                <Progress.Bar color={colors.secondary} progress={countdown.syl} width={windowWidth / 1.3} />
              </View>
              <Text style={{
                flex: 0.2,
                fontFamily: fonts.secondary[600],
                textAlign: 'center',
                fontSize: 15
              }}>{(countdown.syl * 100).toFixed(2)}%</Text>
            </View>
          </>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('Progress', {
            user: user,
            tipe: 'GKM'
          })
        }}>
          <>
            <View style={{
              marginTop: 10,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 10,
            }}>
              <Text style={{
                color: colors.white,
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: 16,
              }}>Progress GKM</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
              <View style={{
                flex: 1,
              }}>
                <Progress.Bar color={colors.secondary} progress={countdown.gkm} width={windowWidth / 1.3} />
              </View>
              <Text style={{
                flex: 0.2,
                fontFamily: fonts.secondary[600],
                textAlign: 'center',
                fontSize: 15
              }}>{(countdown.gkm * 100).toFixed(2)}%</Text>
            </View>
          </>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('Training', {
            user: user,
            tipe: 'Training'
          })
        }}>
          <>
            <View style={{
              marginTop: 10,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 10,
            }}>
              <Text style={{
                color: colors.white,
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: 16,
              }}>Schedule Training</Text>
            </View>

          </>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Training', {
            user: user,
            tipe: 'GKM'
          })
        }}>
          <>
            <View style={{
              marginTop: 10,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 10,
            }}>
              <Text style={{
                color: colors.white,
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: 16,
              }}>Schedule GKM</Text>
            </View>

          </>
        </TouchableOpacity>


      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {

          setIsVisible(!isVisible);
        }}>
        <View style={{
          flex: 1,
          backgroundColor: '#00000086',
          justifyContent: 'center',
          padding: 10,
        }}>

          <View style={{
            height: windowWidth / 3,
            backgroundColor: colors.secondary,
            borderRadius: 20,
          }}>
            <Pressable onPress={() => {
              setIsVisible(false)
            }} style={{
              width: 50,
              height: 50,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon type='ionicon' name='close' color={colors.white} />
            </Pressable>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 18,
              color: colors.white,
              textAlign: 'center',
            }}>Reminder {countdown.dttrn.judul} Tomorrow !</Text>
          </View>


        </View>
      </Modal>


      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible2}
        onRequestClose={() => {

          setIsVisible2(!isVisible2);
        }}>
        <View style={{
          flex: 1,
          backgroundColor: '#00000086',
          justifyContent: 'center',
          padding: 10,
        }}>

          <View style={{
            height: windowWidth / 3,
            backgroundColor: colors.black,
            borderRadius: 20,
          }}>
            <Pressable onPress={() => {
              setIsVisible2(false)
            }} style={{
              width: 50,
              height: 50,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon type='ionicon' name='close' color={colors.white} />
            </Pressable>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 18,
              color: colors.white,
              textAlign: 'center',
            }}>Reminder {countdown.dtgkm.judul} Tomorrow !</Text>
          </View>


        </View>
      </Modal>

    </SafeAreaView >

  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})