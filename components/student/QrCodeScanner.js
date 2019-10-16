import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from "firebase"
import moment from "moment"

const QrCodeScanner = (props) => {

  const [hasCameraPermission, setPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    getPermissionsAsync()
  }, [])

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setPermission(status === 'granted')
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    await register()
    alert(`You have registered for this class`);
  };

  const register = async () => {
    try {
      if (!scanned) {
        setScanned(true)
        const uid = firebase.auth().currentUser.uid
        const day = moment().format('YYYYMMDD');
        const day2 = moment().format('Do, MMM YYYY');
        const user = await firebase.database().ref(`users/${uid}`).once("value")
        const studentRef = firebase.database().ref(`studentRegister/${uid}/${props.navigation.getParam('key', 'NO-ID')}/${day}`)
        const teacherRef = firebase.database().ref(`teacherRegister/${props.navigation.getParam('uid', 'NO-ID')}/${props.navigation.getParam('key', 'NO-ID')}/${day}`)

        await studentRef.set({
          day: day2
        })

        await teacherRef.update({
          day: day2
        })

        await teacherRef.child("students").update({
          [uid]: user.val().fullNames
        })

        props.navigation.goBack()
      }
    } catch (error) {

    }
  }

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  )
}

export default QrCodeScanner
